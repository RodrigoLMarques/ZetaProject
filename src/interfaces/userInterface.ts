export interface INewUser {
    name: string;
    email: string;
    contact: string;
    password: string;
}

export interface ISafeUser {
    id: number;
    name: string;
    email: string;
    contact: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    contact: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserPayload {
    idToken: number
}