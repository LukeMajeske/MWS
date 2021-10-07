import { makeAutoObservable} from "mobx";
import agent from "../api/agent";
import { Ticket } from "../models/ticket";

export default class TicketStore{
    tickets: Ticket[] = [];
    ticketRegistry = new Map<string, Ticket>();

    constructor(){
        makeAutoObservable(this)
    }

    private setTickets = (tickets:Ticket[]) => {
        //var new_tickets = [];
        tickets.forEach((ticket)=>{
            ticket.date = ticket.date.split('T')[0];
            this.ticketRegistry.set(ticket.id,ticket);
            //new_tickets.push(ticket);
        })
    }



    loadTickets = async () =>{
        try{
           this.setTickets(await agent.Tickets.list());
        }catch(error){
            console.log(error);
        }
    }


    createTicket = async (ticket:Ticket) =>{
        try{
            await agent.Tickets.create(ticket);
        }catch(error){
            console.log(error);
        }
    }


    deleteTicket = async (id:string) =>{
        try{
            await agent.Tickets.delete(id);
        }catch(error){
            console.log(error);
        }
    }


}