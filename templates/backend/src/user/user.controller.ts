import { Controller, Post,Request ,Body, UseInterceptors, UseGuards, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/Dtos/User.dto';
import { TransformInterceptor } from 'src/Interceptors/Response.Interceptor';
import { TransformErrorInterceptor } from 'src/Interceptors/Error.Interceptor';
import { JwtRefreshTokenGuard } from 'src/strategy/RefreshToken.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('user')
@UseInterceptors(TransformInterceptor)
@UseInterceptors(TransformErrorInterceptor)
export class UserController {

    constructor(private UserService: UserService){}

    
    @UseGuards(AuthGuard)
    @Get('getMe')
    getMe(@Request() req ) {
        
        return this.UserService.getMe(req.user.sub);
    }


}
