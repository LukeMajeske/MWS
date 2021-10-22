
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ClientItem from "./ClientItem";


export default observer(function ClientManager(){
    const {userStore} = useStore();
    const {clientManager} = userStore;

    useEffect(() => {
        userStore.getClients()
    },[userStore,clientManager]);

    function returnClients(){
        var client_items = [];
        for(var client of clientManager.values()){
            if(!client.role.includes("SuperAdmin")){
                client_items.push(<ClientItem key={client.id} client={client}/>);
            }

        }
        return client_items;
    }

    return(
        <Segment>
            {returnClients()}
        </Segment>
    )

})