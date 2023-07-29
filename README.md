# `Nestjs-React-SetUp`

This package is for setting up the environment for working with Nestjs and react.
React will be setup with vite.
Nestjs will be setup will basic connection to a database, implementation of basic authentication and Guards with JWT.


## Installation

```sh
npm install -g nestjs-react-setup
```

## Usage

### By running:

```sh
npx nestjs-react-setup project-setup
```

two directores that will be named "backend" and "frontend"

### On the server for example

```js
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
```


