import { EAuthAction } from '../Reducers/Auth.reducer';


export interface IAction {
    type: EAuthAction | any,
    payload?: {};
}