import { Form, Formik } from "formik";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import {v4 as uuid} from "uuid";
import MyTextInput from "../../app/common/form/MyTextInput";


interface Props{
    url: string;
}

export default function TicketForm({url}:Props){
    const {ticketStore} = useStore();
    const {createTicket} = ticketStore;
    
    function ticketSubmit(ticket){
        const newTicket ={
            ...ticket,
            id:uuid(),
    };
        console.log(newTicket);
        createTicket(newTicket);
    }
    let curDate = new Date();
    return(
        <Formik 
            initialValues = {{
                id: '',
                date: curDate.toISOString(),
                username: '',
                site: url,
                subject: '',
                description: ''
            }} 
            onSubmit={values => ticketSubmit(values)}>
            {({handleSubmit}) => (
            <Form onSubmit={handleSubmit}  autoComplete='off'>
                <Header as='h1' style={{color:'black'}}>Create Ticket</Header>
                <MyTextInput placeholder='Subject' name='subject'/>
                <MyTextInput placeholder='Description' name='description'/>
                <Button positive type='submit'>Submit</Button>
            </Form>)}
        </Formik>
    )
}