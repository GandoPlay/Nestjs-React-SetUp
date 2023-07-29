import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/Schemas/User.schema';

@Injectable()
export class RefStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<UserDocument>,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_REFRESH'),
    });
  }

  async validate(payload: { sub: string, name:string}) {
    const result = await this.UserModel.findById(payload.sub);
    const user = result;
    return user;
  }
}
