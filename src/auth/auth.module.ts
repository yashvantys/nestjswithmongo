import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({ secret: 'dev_secret' }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
