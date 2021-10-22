import React from "react";
import { Button, Header, Progress, Segment } from "semantic-ui-react";
import { Website } from "../../app/models/website";
import modalStore from "../../app/stores/modalStore";
import { useStore } from "../../app/stores/store";
import TicketForm from "../tickets/TicketForm";


interface Props{
    website: Website
}

export default function WebsiteItem({website}:Props){
    const {modalStore} = useStore();

    return(
        <Segment>
            <Header as="h3" style={{color:"black"}}>{website.url}</Header>
            <Progress percent={website.progress} progress color="green"/>
            <Button positive>Progress Notes</Button>
            <Button color='blue' onClick={() => modalStore.openModal(<TicketForm/>)} floated='right'>Create Ticket</Button>

        </Segment>
    )
}