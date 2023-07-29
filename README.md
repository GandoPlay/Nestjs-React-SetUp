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

```ts
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


### On the client side for example
```ts

import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:3000" });

function authorizationRequest(config: any, tokenType: string) {
  let token = localStorage.getItem(tokenType) as string;
  if (token != null) {
    if (config.defaults) {
      config.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      config.headers["Authorization"] = "Bearer " + token;
    }

    // config.headers.set("Authorization", "Bearer " + token);
  }
}

client.interceptors.request.use(
  (config) => {

    if (config.url === "/auth/getAccessToken") {
      authorizationRequest(config, "refreshToken");
    } else {
      authorizationRequest(config, "accessToken");
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const originalReq = error.config;
    if (
      error?.response?.status === 401 &&
      originalReq.url === "/auth/getAccessToken"
    ) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      return client.get("/auth/getAccessToken").then((res) => {
        if (res?.status === 200) {
          // const access_token = res.data.access_token;
          
          localStorage.setItem(
            "accessToken",
            res.data.access_token
          );
          authorizationRequest(client, "accessToken");
          return client(originalReq);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default client;

```




