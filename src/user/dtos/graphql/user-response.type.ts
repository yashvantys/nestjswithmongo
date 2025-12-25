import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
}

@ObjectType()
export class SignupResponse {
  @Field()
  id: string;  
}
@ObjectType()     
export class UserProfileResponse {
  @Field()
  id: string; 
  @Field()
  email: string;  
}  
@ObjectType()
export class LogoutResponse {
  @Field()
  message: string;
}