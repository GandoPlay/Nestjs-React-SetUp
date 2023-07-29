import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/Schemas/User.schema';
import { UserDto } from 'src/Dtos/User.dto';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private config: ConfigService,
    private jwt: JwtService,){}
    async createUser(userDto: UserDto){

      const hash = await argon.hash(userDto.password);
      delete userDto.password;
      const newobj = { ...userDto, ...{ hash } };
        const createdUser = new this.userModel(newobj);
        try {
          const user = await createdUser.save();

          const access_Token = await (
            await this.accessToken(user.id)
          ).access_token;
    
          const refresh_token = await (
            await this.refreshToken(user.id)
          ).refresh_token;
          return{
            user, access_Token, refresh_token
          }

          
        } catch (error) {
          if (error.code === 11000) {
            throw new ConflictException('A user with this email already exists');
          }
          throw error;
        }

    }

    async getMe(id: string){
      try {
        
        const user = this.userModel.findById(id);
        return user;
      } catch (error) {
        return undefined;
      }
    }



    async accessToken(
      id: string,
    ): Promise<{ access_token: string }> {
      const payload = {
        sub: id,
        
      };
      const secret = this.config.get('JWT_SECRET');
  
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '1h',
        secret: secret,
      });
  
      return {
        access_token: token,
      };
    }
    async refreshToken(
      id: string,
    ): Promise<{ refresh_token: string }> {
      const payload = {
        sub: id,
      };
      const secret = this.config.get('JWT_SECRET_REFRESH');
  
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '24h',
        secret: secret,
      });
      return { refresh_token: token };
    }
    async generateAccessToken(user) {
      const access_Token = await this.accessToken(user.id);
      return access_Token;
    }
}
