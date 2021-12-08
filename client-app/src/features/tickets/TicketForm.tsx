import { Field, Form, Formik } from "formik";
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
                description: '',
                priority:'low',
                status:'open'
            }} 
            onSubmit={values => ticketSubmit(values)}>
            {({handleSubmit}) => (
            <Form className="ui form" onSubmit={handleSubmit}  autoComplete='off'>
                <Header as='h1' style={{color:'black'}}>Create Ticket</Header>
                <MyTextInput placeholder='Subject' name='subject'/>
                <MyTextInput placeholder='Description' name='description'/>
                <Field as="select" name='priority'>
                    <option value="low">Low</option>
                    <option value="med">Medium</option>
                    <option value="high">High</option>
                </Field>
                <Field as="select" name='status'>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="blocked">Blocked</option>
                </Field>
                <Button positive type='submit'>Submit</Button>
            </Form>)}
        </Formik>
    )
}