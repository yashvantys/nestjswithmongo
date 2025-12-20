import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LoginInput } from './dtos/graphql/user-input';
import { LoginResponse } from './dtos/graphql/user-response.type';

@Resolver()
export class UserResolver {
    constructor(private authService: AuthService) {}
    @Mutation(() => LoginResponse)
    async login(@Args('loginInput') loginInput: LoginInput) {
        console.log(loginInput);
        return await this.authService.login(loginInput);
    }    

    // @Mutation(() => UserResponseDto)
    // async signup(@Args('createUserDto') createUserDto: CreateUserDto) {
    //     return await this.authService.signup(createUserDto);
    // }    
}       