import axios, { AxiosResponse } from "axios";
import { Ticket } from "../models/ticket";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;


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


const agent = {
    Tickets
}

export default agent;