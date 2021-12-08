import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Divider, Dropdown, Item, Segment } from "semantic-ui-react";
import { Ticket } from "../../../app/models/ticket";
import { useStore } from "../../../app/stores/store";
import TicketComments from "./TicketComments";
import WatchList from "./WatchList";


interface Props{
    ticket: Ticket;
}



export default observer(function TicketItem({ticket}: Props)
{
    const{ticketStore} = useStore();
    const{deleteTicket, editTicket} = ticketStore;

    const priorityOptions = [
        {
          key: 'low',
          text: 'Low',
          value: 'low',
          label: { color: 'green', empty: true, circular: true },
        },   
        {
          key: 'medium',
          text: 'Medium',
          value: 'medium',
          label: { color: 'yellow', empty: true, circular: true },
        },   
        {
          key: 'high',
          text: 'High',
          value: 'high',
          label: { color: 'red', empty: true, circular: true },
        },
    ]

    const statusOptions = [
        {
          key: 'open',
          text: 'Open',
          value: 'open',
          label: { color: 'green', empty: true, circular: true },
        },   
        {
          key: 'blocked',
          text: 'Blocked',
          value: 'blocked',
          label: { color: 'yellow', empty: true, circular: true },
        },   
        {
          key: 'closed',
          text: 'Closed',
          value: 'closed',
          label: { color: 'blue', empty: true, circular: true },
        },
    ]

    const PriorityDropdown = () => (
        <Dropdown
            key={ticket.id+"priority"}
            defaultValue={ticket.priority}
            options={priorityOptions}
            onChange={(e, data) => {handleChange('priority',data.value)}}
        >
        </Dropdown>
      )
    
    const StatusDropdown = () => (
    <Dropdown
        key={ticket.id+"status"}
        defaultValue={ticket.status}
        options={statusOptions}
        onChange={(e, data) => {handleChange('status',data.value)}}
    >
    </Dropdown>
    )
    const[showComments, setShowComments] = useState(false);

    let handleChange = (field, value) => {
        console.log("Updating Ticket",ticket);
        editTicket(ticket,field,value);
    }

    function handleTicketDelete(e:SyntheticEvent<HTMLButtonElement>, id:string){
        deleteTicket(id);
    }

    let handleShowComments = () => {
        setShowComments(prevVal => prevVal = !prevVal);
    }
    return(
        
        <Segment.Group>
            
            <Segment className="ticket-segment">
                <Item key={ticket.id}>
                    <Item.Content className="ticket-item" >
                        <Item.Header className="ticket-header">
                            <span className="ticket-username"><strong>Owner:</strong> {ticket.users[0].username}</span>
                            <span className="ticket-status"><strong>Status:</strong>{StatusDropdown()}</span>
                            <span className="ticket-priority">
                                <strong>Priority:</strong>
                                {PriorityDropdown()}
                            </span>
                            <span className="ticket-subject">
                                <strong>Subject:</strong> {ticket.subject}<br/>
                                <strong>Date Created:</strong>{ticket.date}
                            </span>
                            <span><WatchList key={ticket.id+"watch"} ticketId={ticket.id}/></span>
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
                        {showComments ? <Button  color="blue" onClick={()=> handleShowComments()}>Hide Comments</Button> 
                        : <Button positive onClick={()=> handleShowComments()} >Show Comments</Button>}

                        <Button negative onClick={(e)=>{handleTicketDelete(e,ticket.id)}}>Delete</Button>
                        <Button color='blue' floated='right'>Archive</Button>
                    </Item.Content>
                    {showComments ? <TicketComments ticketId={ticket.id}/> : null}
                </Item>
            </Segment>
        </Segment.Group>
    )
})