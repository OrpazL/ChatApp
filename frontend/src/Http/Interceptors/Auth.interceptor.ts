import axios from 'axios';
import { BASE_URL } from '../http.environment';

export const Auth = axios.create({
    baseURL: BASE_URL
})

Auth.interceptors.response.use((res => {
    console.log('INTERCEPTOR LOG:: ', res);
    return res;
}))