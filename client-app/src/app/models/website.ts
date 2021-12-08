import { User } from "./user";

export interface Website{
    user?: User;
    id: string;
    progress: number;
    url: string;
}


