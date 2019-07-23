import { IUser } from './User.interface';

export interface IChat {
    _id: string,
    author: string,
    message: string,
    date: number,
    pinned: boolean,
    seenBy: IUser[],
}