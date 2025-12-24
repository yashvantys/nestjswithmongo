import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'dev_secret', // Use environment variable in production
    });
  }

  async validate(payload: any) {
    // The payload contains the user data from the JWT token
    // You can add additional validation logic here
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}