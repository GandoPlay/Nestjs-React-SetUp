import { Module } from '@nestjs/common';
import { User, UserSchema } from 'src/Schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy, RefStrategy } from 'src/strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[ ConfigModule.forRoot(),
    JwtModule.register({}),MongooseModule.forFeature([{ name: User.name, schema: UserSchema, }, ])],
  controllers:[AuthController],
  providers: [AuthService, ConfigService, JwtStrategy, RefStrategy],
})
export class AuthModule {}
