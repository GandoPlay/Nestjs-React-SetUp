import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from 'src/Schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, RefStrategy } from 'src/strategy';

@Module({
  imports:[ ConfigModule.forRoot(),
    JwtModule.register({}),MongooseModule.forFeature([{ name: User.name, schema: UserSchema, }, ])],
  controllers:[UserController],
  providers: [UserService, ConfigService, JwtStrategy, RefStrategy],
})
export class UserModule {}
