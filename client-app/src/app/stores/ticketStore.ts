import { makeAutoObservable, reaction, runInAction} from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { Ticket } from "../models/ticket";

export default class TicketStore{
    tickets: Ticket[] = [];
    ticketRegistry = new Map<string, Ticket>();
    predicate = new Map().set('all', true);

    constructor(){
        makeAutoObservable(this)

        reaction(
            () => this.predicate.keys(), //Do any of the predicate keys change? If so do something
            () => {
                this.ticketRegistry.clear();
                this.loadTickets();
            }
        )
    }

    private setTickets = (tickets:Ticket[]) => {
        //var new_tickets = [];
        tickets.forEach((ticket)=>{
            console.log("loading ticket:", ticket.id);
            ticket.date = ticket.date.split('T')[0];
            this.ticketRegistry.set(ticket.id,ticket);
            //new_tickets.push(ticket);
        })
    }

    setPredicate = (predicate: string, value:string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                if(key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch(predicate){
            case 'all':
                resetPredicate();
                this.predicate.set("all", true);
                break;
            case "isWatching":
                resetPredicate();
                this.predicate.set("isWatching", true);
                break;
            case "isAssignedTo":
                resetPredicate();
                this.predicate.set("isAssignedTo", true);
                break;
            case "isOwner":
                resetPredicate();
                this.predicate.set("isOwner", true);
                break;
            case "startDate":
                resetPredicate();
                this.predicate.set("startDate",value);
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        this.predicate.forEach((value, key) => {
            if(key === 'startDate'){
                params.append(key, (value as Date).toISOString());
            }else{
                params.append(key,value);
            }
        })

        return params;
    }



    loadTickets = async () =>{
        try{
           this.setTickets(await agent.Tickets.list(this.axiosParams));
        }catch(error){
            console.log(error);
        }
    }


    createTicket = async (ticket:Ticket) =>{
        try{
            await agent.Tickets.create(ticket);
            console.log("Ticket Created: ", ticket);
            /*runInAction(()=>{
                this.ticketRegistry.set(ticket.id, ticket);
            })*/
            this.loadTickets();
        }catch(error){
            console.log(error);
        }
    }


    deleteTicket = async (id:string) =>{
        try{
            await agent.Tickets.delete(id);
            runInAction(()=>{
                this.ticketRegistry.delete(id);
            });
        }catch(error){
            console.log(error);
        }
    }

    editTicket = async (ticket:Ticket, field:string, value:string) =>{
        try{
            runInAction(() =>{
                ticket[field] = value;
            })
            await agent.Tickets.update(ticket);
        }catch(error){
            console.log(error);
        }
    }

    updateWatchers = async (ticketId:string, username:string) => {
        try{
            await agent.Tickets.updateWatchers(ticketId);

            let ticket = this.ticketRegistry.get(ticketId);
            console.log(ticketId);
            //Update Registry with change
            let result = ticket.users.findIndex(watcher => watcher.username === username);

            runInAction(() => {
                if(result >= 0){
                    ticket.users[result].isWatching = !ticket.users[result].isWatching;
                    this.ticketRegistry.set(ticketId, ticket);
                }
                else{
                    let watcher : Profile = {
                        username: username,
                        isWatching: true,
                        displayName: null,
                        isAssignedTo: false,
                        isOwner: false
                    }
                    ticket.users.push(watcher);
                    this.ticketRegistry.set(ticketId, ticket);
                }
            })

        }catch(error){
            console.log(error);
        }
    }

}