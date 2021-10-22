import { Website } from "./website";

export interface User{
    username: string;
    displayName: string;
    role: string[];
    token: string;
    websites:Website[];
}

export interface UserSimple{
    id:string;
    username: string;
    email: string;
    role: string[];
    websites:Website[];
}

export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}