import { Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import {v4 as uuid} from "uuid";
import MyTextInput from "../../app/common/form/MyTextInput";


export default function TicketForm(){
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
    
    function handleChange(event: ChangeEvent<HTMLFormElement>){
        const {name,value} = event.target;
        setTicket({...ticket,[name]:value});
    }


    return(
        <Formik initialValues = {{email: ''}} onSubmit={values => console.log(values)}>
            <Form onSubmit={handleSubmit} onChange={handleChange} autoComplete='off'>
                <Header as='h1' style={{color:'black'}}>Create Ticket</Header>
                <MyTextInput type='date' placeholder='User' name='date'/>
                <MyTextInput placeholder='Subject' name='subject'/>
                <MyTextInput placeholder='Site' name='site'/>
                <MyTextInput placeholder='Description' name='description'/>
                <Button positive type='submit'>Submit</Button>
            </Form>
        </Formik>
    )
}