import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UserTokenSchema, UserToken } from './schema/user-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserToken.name, schema: UserTokenSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserResolver, UserService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
