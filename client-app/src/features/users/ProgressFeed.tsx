import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Header, Segment, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import TicketItem from "../tickets/dashboard/TicketItem";


export default observer(function ProgressFeed()
{
  const {ticketStore, userStore} = useStore();
  const {ticketRegistry} = ticketStore;
  const {user} = userStore;


  let filterTickets = () => {
    var ticket_items = [];
    if(user == null) return ticket_items;
    for(var ticket of ticketRegistry.values()){
      console.log(ticket.users);
      if(ticket.users.find(u=> u.username === user.username) !== undefined){
        console.log("Ticket:", ticket);
        ticket_items.push(<TicketItem key={ticket.id} ticket={ticket}/>);
      }
    }
    return ticket_items;
  }

    return(
        <Segment>
            <Header as='h1' className="black-header">Progress Feed</Header>
            {filterTickets()}
        </Segment>
    )

})