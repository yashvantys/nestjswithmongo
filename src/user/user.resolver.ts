import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginInput, SignupInput } from './dtos/graphql/user-input';
import {
  LoginResponse,
  SignupResponse,
  UserProfileResponse,
} from './dtos/graphql/user-response.type';
import { UserService } from './user.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './schema/user.schema';

@Resolver()
export class UserResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Public()
  @Mutation(() => SignupResponse)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    return await this.userService.signup(signupInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserProfileResponse)
  async profile(@Context() context) {
    const userId = context.req.user.id;
    return await this.userService.getUserById(userId);
  }
}
