import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Divider, Item, Segment } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";
import { useStore } from "../../../app/stores/store";

interface Props{
    ticket: Ticket;
    //username: string;
}

export default observer(function TicketItem({ticket}: Props)
{
    const{ticketStore} = useStore();
    const{deleteTicket, ticketRegistry} = ticketStore;

    function handleTicketDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        deleteTicket(id);
        ticketRegistry.delete(id);
    }
    return(
        <Segment.Group>
            <Segment className="ticket-segment">
                <Item key={ticket.id}>
                    <Item.Content className="ticket-item" >
                        <Item.Header className="ticket-header">
                            <span className="ticket-username"><strong>User:</strong> {ticket.user[0].username}</span>
                            <span className="ticket-subject">
                                <strong>Subject:</strong> {ticket.subject}<br/>
                                <strong>Date:</strong>{ticket.date}
                            </span>
                        </Item.Header>
                        <Item.Meta className='ticket-site'>
                            <span><strong>Site: </strong>{ticket.site}</span>
                        </Item.Meta>
                        <Item.Description className="ticket-description">
                            <Divider horizontal>Description</Divider>
                            <div className='ticket-text'>
                                <p>{ticket.description}</p>
                            </div>
                        </Item.Description>
                        <Button positive>Reply</Button>
                        <Button negative onClick={(e)=>{handleTicketDelete(e,ticket.id)}}>Delete</Button>
                        <Button color='blue' floated='right'>Archive</Button>
                    </Item.Content>

                </Item>
            </Segment>
        </Segment.Group>
    )
})