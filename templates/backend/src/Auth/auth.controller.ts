import { Controller, Post,Request ,Body, UseInterceptors, UseGuards, Get} from '@nestjs/common';
import { UserDto } from 'src/Dtos/User.dto';
import { TransformInterceptor } from 'src/Interceptors/Response.Interceptor';
import { TransformErrorInterceptor } from 'src/Interceptors/Error.Interceptor';
import { JwtRefreshTokenGuard } from 'src/strategy/RefreshToken.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from './auth.service';


@Controller('auth')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(TransformErrorInterceptor)
export class AuthController {

    constructor(private UserService: AuthService){}

    @UseGuards(JwtRefreshTokenGuard)
    @Get('getAccessToken')
    access(@Request() req) {
      return this.UserService.generateAccessToken(req.user);
    }

    
    @Post('createUser')
    createUser(@Request() req , @Body() userDto: UserDto,) {
        return this.UserService.createUser(userDto);
    }

}
