import {Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Grid, GridColumn, Segment,Form, Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TicketItem from "./TicketItem";
import {v4 as uuid} from "uuid";


export default observer(function TicketDashboard()
{
    const {ticketStore} = useStore();
    const {createTicket,ticketRegistry} = ticketStore;

    const [ticket, setTicket] = useState({
        id: '',
        date: '',
        username: '',
        site: '',
        subject: '',
        description: ''
    })

    useEffect(() => {
        ticketStore.loadTickets();
    },[ticketStore])

    //const {tickets} = ticketStore;

    function handleSubmit(){
        const newTicket ={
            ...ticket,
            id:uuid(),
    };

        //console.log(newTicket);
        createTicket(newTicket);
        ticketStore.loadTickets();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value} = event.target;
        setTicket({...ticket,[name]:value});
    }

    function returnTickets(){
        var ticket_items = [];
        for(var ticket of ticketRegistry.values()){
            ticket_items.push(<TicketItem key={ticket.id} ticket={ticket}/>);
        }
        return ticket_items;
    }

    return(
        <Fragment>
            <div className='ticket-dashboard'>
                <Grid>
                    <GridColumn width='10'>
                        {returnTickets()} 
                    </GridColumn>
                    <GridColumn width='6'>
                        <Segment>
                            <Header as='h1' style={{color:'black'}}>Create Ticket</Header>
                            <Formik initialValues = {{email: ''}} onSubmit={values => console.log(values)}>
                                <Form onSubmit={handleSubmit} autoComplete='off'>
                                    <Form.Input placeholder='User' name='username' onChange={handleChange}/>
                                    <Form.Input type='date' placeholder='User' name='date' onChange={handleChange}/>
                                    <Form.Input placeholder='Subject' name='subject' onChange={handleChange}/>
                                    <Form.Input placeholder='Site' name='site' onChange={handleChange}/>
                                    <Form.Input placeholder='Description' name='description' onChange={handleChange}/>
                                    <Form.Button positive type='submit'>Submit</Form.Button>
                                </Form>
                            </Formik>
                        </Segment>
                    </GridColumn>
                </Grid>
            </div>
        </Fragment>
    )
})