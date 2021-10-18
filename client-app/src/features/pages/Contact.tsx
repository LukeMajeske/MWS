import { Form, Formik } from "formik";
import React from "react";
import { Button, Segment } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default function Contact(){
    const {contactStore} = useStore(); 
    return(
        <Segment>
            <Formik initialValues={{email:"", description:"", error:null}}
                onSubmit={(values) => contactStore.sendContactEmail({fromEmail:values.email, body:values.description})}>
                
                <Form>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextArea name="description" placeholder="Description..."/>
                    <Button positive content="Send" type="submit"/>
                </Form>

                
            </Formik>
        </Segment>
    )
}