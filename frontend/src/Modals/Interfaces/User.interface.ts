import { ERole } from '../Enums/Role.enum';

export interface IGroupUser {
    _id: string,
    role: ERole
}

export interface IUser {
    _id: string,
    username: string,
    email: string,
    password: string,
    isOnline: boolean,
    groups: string[],
    }

