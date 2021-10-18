import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import Email from "../models/email";



export default class ContactStore{

    constructor(){
        makeAutoObservable(this);
    }


    sendContactEmail = (email:Email) => {
        agent.Contact.send(email);
        console.log('email sent!');
    }
}