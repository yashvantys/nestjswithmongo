import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginInput, SignupInput } from './dtos/graphql/user-input';
import {
  LoginResponse,
  SignupResponse,
} from './dtos/graphql/user-response.type';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Mutation(() => LoginResponse)
  async login(@Args('loginInput') loginInput: LoginInput) {    
    return await this.authService.login(loginInput);
  }

  @Mutation(() => SignupResponse)
  async signup(@Args('signupInput') signupInput: SignupInput) {    
    return await this.userService.signup(signupInput);
  }
}
