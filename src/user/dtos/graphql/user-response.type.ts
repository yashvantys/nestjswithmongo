import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;
}

@ObjectType()
export class SignupResponse {
  @Field()
  id: string;  
}