import axios from 'axios';
import { BASE_URL } from '../http.environment';

export const AuthHttp = axios.create({
    baseURL: `${BASE_URL}/auth`
})

AuthHttp.interceptors.response.use((res => {
    console.log('INTERCEPTOR LOG:: ', res);
    return res;
}))