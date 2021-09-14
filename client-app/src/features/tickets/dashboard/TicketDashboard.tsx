import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TicketItem from "./TicketItem";


export default observer(function TicketDashboard()
{
    const {ticketStore} = useStore();

    useEffect(() => {
        ticketStore.loadTickets();
    },[ticketStore])

    const {tickets} = ticketStore;
    return(
        <Fragment>
            <div className='ticket-dashboard'>
                <Grid>
                    <GridColumn width='10'>
                        {tickets.map((ticket) => (
                            <TicketItem key={ticket.id} ticket={ticket}/>
                        ))} 

                    </GridColumn>
                </Grid>
            </div>
        </Fragment>
    )
})