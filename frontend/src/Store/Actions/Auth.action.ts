import { EAuthAction } from '../Reducers/Auth.reducer';
import { IUser } from '../../Modals/Interfaces/User.interface';

export const setUser = (user: IUser) => ({
    type: EAuthAction.SET_USER,
    payload: { user }
})

export const signInUser = (user: IUser) => {
    return (dispatch: Function) => {
        dispatch(setUser(user));
    }
}