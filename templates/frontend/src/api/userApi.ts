import { Auth } from "../types";
import client from "./interceptors";



export const createUser = async (data: Auth)=>{ const user =  await client.post('/auth/createUser', data);

if (user.data.data.access_Token && user.data.data.refresh_token) {
    localStorage.setItem("accessToken", user.data.data.access_Token);
    localStorage.setItem("refreshToken", user.data.data.refresh_token);
    return user;
  }}
export const getMe = async ()=>{ return (await client.get('/user/getMe')).data.data;}


