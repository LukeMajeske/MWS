import {Form, Formik } from "formik";
import React from "react";
import {Button, Header, Segment} from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";


export default function QuoteForm(){
    const {contactStore} = useStore();

    return(
        <>
            <Segment>
                <Header as={'h1'} content='Contact Me!' className='black-header'/>
                <Formik initialValues={{email:"", description:"", error:null}}
                    onSubmit={(values) => contactStore.sendContactEmail({fromEmail:values.email, body:values.description})}>
                    
                    <Form className="ui form contact-form">
                        <MyTextInput name='first-name' placeholder='First Name'/>
                        <MyTextInput name='last-name' placeholder='Last Name'/>
                        <MyTextInput name='domain' placeholder='Your Website Domain'/>
                        <MyTextInput name='email' placeholder='Email'/>
                        <MyTextArea name="description" placeholder="Description..."/>
                        <Button positive content="Send" type="submit"/>
                    </Form>

                    
                </Formik>
            </Segment>
        </>
    )
}