import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Header, Progress, Segment, Comment } from "semantic-ui-react";
import { Website } from "../../app/models/website";
import { useStore } from "../../app/stores/store";
import TicketForm from "../tickets/TicketForm";
import ProgressNoteItem from "./ProgressNoteItem";
import ProgressNotes from "./ProgressNotes";


interface Props{
    website: Website
}

export default observer(function WebsiteItem({website}:Props){
    const {modalStore, progressStore} = useStore();
    const[showNotes, setShowNotes] = useState(false);
    const{progressRegistry} = progressStore;

    return(
        <Segment>
            <Header as="h3" style={{color:"black"}}>{website.url}</Header>
            <Progress percent={website.progress} progress color="green"/>
            {showNotes ? <Button color="blue" onClick={()=>setShowNotes(prevVal=> prevVal = !prevVal)}>Hide Progress</Button>
            : <Button positive onClick={()=>setShowNotes(prevVal=> prevVal = !prevVal)}>View Progress</Button>}
            <Button color='blue' onClick={() => modalStore.openModal(<TicketForm url={website.url}/>)} floated='right'>Create Ticket</Button>

            {showNotes ? <>
                <ProgressNotes websiteId={website.id}/>
                <Comment.Group>
                    <ProgressNoteItem websiteId={website.id}/>
                </Comment.Group> </>
                : null
            }  
        </Segment>
    )
})