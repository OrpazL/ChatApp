import { IAction } from '../Actions/Action.enum';

export enum EAuthAction {
    SET_USER,
    GET_USER,
    SIGN_UP,
    SIGN_IN
}
export interface IAuthReducer {

}

const initialState: IAuthReducer = {

}

export const authReducer = (state = initialState, action: IAction) => {
    const temp: IAuthReducer = { ...state };
    switch (action.type) {

        case EAuthAction.SET_USER:
            break;
    }
    return temp;
}
