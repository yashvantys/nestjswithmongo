import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService, private userService: UserService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }
}
