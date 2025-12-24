import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { LoginDto } from '../user/dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import type { StringValue } from 'ms';

interface JwtUser {
  id: string;
  email: string;
  role: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<JwtUser | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateAccessToken(
    user: { id: string; email: string; role: string },
    expiresIn: StringValue | number = '15m',
  ) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    } as JwtPayload;
    return await this.jwtService.signAsync(payload, { expiresIn });
  }
  private async generateRefreshToken(user: { id: string }) {
    const payload = {
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }
}
