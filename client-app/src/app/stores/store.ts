import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ContactStore from "./contactStore";
import ModalStore from "./modalStore";
import TicketStore from "./ticketStore";
import UserStore from "./userStore";

interface Store{
    ticketStore: TicketStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    contactStore: ContactStore;
    commentStore: CommentStore;
}


export const store: Store = {
    ticketStore: new TicketStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    contactStore: new ContactStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}