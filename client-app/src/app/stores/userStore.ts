import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues, UserSimple } from "../models/user";
import { store } from "./store";
import {history} from "../.."
import { Transaction } from "../models/transaction";
import { Website } from "../models/website";

export default class UserStore{
    user: User | null = null;
    clientManager = new Map<string, UserSimple>();
    transactionHistory:Transaction[] = [];

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);

            runInAction(() => {
                this.user = user;
            })
            history.push('/profile');
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            user.role = await agent.Account.currentRole();
            runInAction(() => this.user = user);

        }catch(error){
            console.log(error);
        }
    }

    getClients = async () => {
        try{
            var clients = await agent.Account.allClients();
            this.setClients(clients);

        }catch(error){
            console.log(error);
        }
    }

    setClients = async (clients:UserSimple[]) => {
        clients.forEach(client =>{
            this.clientManager.set(client.id, client);
        });
    }

    setTransactions = async () => {
        try{
            if(this.user){
                const transactionHistory = await agent.Account.getTransactions(this.user.username);
                runInAction(() => this.transactionHistory = transactionHistory);
            }
        }
        catch(error){
            console.log(error);
        }
        
    }

    createWebsite = async (website:Website) => {
        try{
            console.log("Creating website: ",website);
            await agent.Account.createWebsite(website);
        }
        catch(error){
            console.log(error);
        }
    }
    

    deleteUser = async (id:string) => {
        try{
            await agent.Account.deleteUser(id);
            console.log("user deleted!");
        }catch(error){
            console.log(error);
        }
    }
}