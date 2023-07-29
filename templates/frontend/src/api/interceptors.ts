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
