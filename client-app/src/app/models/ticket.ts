import { Profile } from "./profile";


export interface Ticket{
    id: string;
    date: string;
    username: string;
    site: string;
    subject: string;
    description: string;
    user?: Profile[];
    //status: string;
}