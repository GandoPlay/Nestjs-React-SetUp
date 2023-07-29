import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schemas/User.schema';
import { UserDto } from 'src/Dtos/User.dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private config: ConfigService,
   ){}
    async getMe(id: string){
      try {
        const user = this.userModel.findById(id);
        return user;
      } catch (error) {
        return undefined;
      }
    }
}
