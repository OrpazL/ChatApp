import { EAuthAction } from '../Reducers/Auth.reducer';
import { IUser } from '../../Modals/Interfaces/User.interface';
import { AuthHttp } from '../../Http/Interceptors/Auth.interceptor';

const setUser = (user: IUser) => ({
    type: EAuthAction.SET_USER,
    payload: { user }
})

export const signInUser = (user: IUser) => {
    return (dispatch: Function) => {
        AuthHttp.post('', user).then(resPost => {
            const user = resPost.data;
            dispatch(setUser(user));
        });
    }
}