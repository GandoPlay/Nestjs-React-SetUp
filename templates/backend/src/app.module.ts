import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [  ConfigModule.forRoot({ isGlobal: true }),MongooseModule.forRoot('mongodb://localhost/MathGame'), UserModule,AuthModule],
})
export class AppModule {}
