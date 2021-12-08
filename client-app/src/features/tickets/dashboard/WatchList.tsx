import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

interface Props{
    ticketId: string;
}

export default observer(function WatchList({ticketId}: Props){
    const {ticketStore, userStore} = useStore();
    const {updateWatchers, ticketRegistry} = ticketStore;
    const {user} = userStore;

    let handleUpdateWatchers = () => {
        //API Call
        console.log("Updating Watchers")
        updateWatchers(ticketId, user.username);
    }

    return(
        <>
            {ticketRegistry.get(ticketId).users.map((watcher)=>
            watcher.isWatching ? <Label key={ticketId + watcher.username} as='a' color="blue">{watcher.username}</Label>
            : null)}
            <Button compact onClick={()=>{handleUpdateWatchers()}}>
                <Icon fitted name='eye'></Icon>
            </Button>
        </>
    )
})