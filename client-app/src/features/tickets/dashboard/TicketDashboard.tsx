import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Grid, GridColumn} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TicketItem from "./TicketItem";
import TicketFilter from "./TicketFilter";


export default observer(function TicketDashboard()
{
    const {ticketStore} = useStore();
    const {ticketRegistry} = ticketStore;


    useEffect(() => {
        ticketStore.loadTickets();
    },[ticketStore])

    function returnTickets(){
        var ticket_items = [];
        for(var ticket of ticketRegistry.values()){
            ticket_items.push(<TicketItem key={ticket.id} ticket={ticket}/>);
        }
        return ticket_items;
    }

    return(
        <Fragment>
            <title>MWS | Dashboard</title>
            <div className='ticket-dashboard'>
                <Grid>
                    <GridColumn width='10'>
                        {returnTickets()} 
                    </GridColumn>
                    <GridColumn width='6'>
                        <TicketFilter/>
                    </GridColumn>
                </Grid>
            </div>
        </Fragment>
    )
})