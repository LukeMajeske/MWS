import axios, { AxiosResponse } from "axios";
import { Ticket } from "../models/ticket";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
})


const requests ={
    get:<T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put:<T> (url: string,body:{}) => axios.put<T>(url,body).then(responseBody),
    del:<T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Tickets ={
    list: () => requests.get<Ticket[]>('/tickets'),
    details: (id:string) => requests.get<Ticket>(`/tickets/${id}`),
    update: (ticket: Ticket) => requests.put<void>(`/tickets/${ticket.id}`, ticket),
    create: (ticket: Ticket) => requests.post<void>('/tickets', ticket),
    delete: (id:string) => requests.del<void>(`/tickets/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login',user),
    register: (user: UserFormValues) => requests.post<User>('/account/register',user)
}


const agent = {
    Tickets,
    Account
}

export default agent;