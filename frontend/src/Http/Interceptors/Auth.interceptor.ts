import axios from 'axios';

export const Auth = axios.create({

})

Auth.interceptors.response.use((res => {
    console.log('INTERCEPTOR LOG:: ', res);
    return res;
}))