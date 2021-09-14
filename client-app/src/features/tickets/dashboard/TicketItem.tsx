import React from "react";
import { Button, Divider, Item, Segment } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";

interface Props{
    ticket: Ticket;
}

export default function TicketItem({ticket}: Props)
{
    return(
        <Segment.Group>
            <Segment className="ticket-segment">
                <Item>
                    <Item.Content className="ticket-item" >
                        <Item.Header className="ticket-header">
                            <span className="ticket-username"><strong>User:</strong> {ticket.username}</span>
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
                        <Button color='blue' floated='right'>Archive</Button>
                    </Item.Content>

                </Item>
            </Segment>
        </Segment.Group>
    )
}