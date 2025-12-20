import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
      constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
      ) {}
    async signup(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = new this.userModel({ ...createUserDto, password: hashedPassword });
        return await user.save();
    }

 
}
