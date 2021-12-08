import { Profile } from "./profile";


export interface Ticket{
    id: string;
    date: string;
    username: string;
    site: string;
    subject: string;
    description: string;
    priority:string;
    status:string;
    users?: Profile[];
    //status: string;
}