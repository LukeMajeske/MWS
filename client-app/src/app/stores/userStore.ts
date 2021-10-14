import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import {history} from "../.."

export default class UserStore{
    user: User | null = null;

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
            user.role = await agent.Account.currentRole();

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
}