import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import Email from "../models/email";
import { Ticket } from "../models/ticket";
import { Transaction } from "../models/transaction";
import { Website } from "../models/website";
import { User, UserFormValues, UserSimple } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
}, (error:AxiosError) => {
    const{data, status} = error.response!;

    switch(status){
        case 400:
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            else{
                toast.error(data)
            }
            break;
    }
})


const requests ={
    get:<T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put:<T> (url: string,body:{}) => axios.put<T>(url,body).then(responseBody),
    del:<T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Tickets ={
    list: (params: URLSearchParams) => axios.get<Ticket[]>('/tickets',{params}).then(responseBody),
    details: (id:string) => requests.get<Ticket>(`/tickets/${id}`),
    update: (ticket: Ticket) => requests.put<void>(`/tickets/${ticket.id}`, ticket),
    create: (ticket: Ticket) => requests.post<void>('/tickets', ticket),
    delete: (id:string) => requests.del<void>(`/tickets/${id}`),
    updateWatchers: (id: string) => axios.put<void>(`/tickets/${id}/watch`).then(responseBody)
}

const Account = {
    current: () => requests.get<User>('/account'),
    currentRole: () => requests.get<string[]>('/account/role'),
    getTransactions: (username:string) => requests.get<Transaction[]>(`/transaction/${username}`),
    createWebsite: (website:Website)=> requests.post<Website>("/website", website),
    login: (user: UserFormValues) => requests.post<User>('/account/login',user),
    register: (user: UserFormValues) => requests.post<User>('/account/register',user),
    allClients: () => requests.get<UserSimple[]>('/account/allusers'),
    deleteUser: (id:string) => requests.del<void>(`/account/${id}`)
}

const Contact = {
    send: (email: Email) => requests.post('/contact', email)
}

const agent = {
    Tickets,
    Account,
    Contact
}

export default agent;