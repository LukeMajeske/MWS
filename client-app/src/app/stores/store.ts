import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import TicketStore from "./ticketStore";
import UserStore from "./userStore";

interface Store{
    ticketStore: TicketStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
}


export const store: Store = {
    ticketStore: new TicketStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}