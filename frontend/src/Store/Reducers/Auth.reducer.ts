import { IAction } from '../Actions/Action.enum';
import { IUser } from '../../Modals/Interfaces/User.interface';

export enum EAuthAction {
    SET_USER,
    GET_USER,
    SIGN_UP,
    SIGN_IN
}
export interface IAuthReducer {
    currentUser: IUser | null;
}

const initialState: IAuthReducer = {
    currentUser: null
}

export const authReducer = (state = initialState, action: IAction) => {
    const temp: IAuthReducer = { ...state };


    switch (action.type) {

        case EAuthAction.SET_USER:
            const user: IUser = action.payload.user;
            temp.currentUser = user;
            break;
    }
    return temp;
}
