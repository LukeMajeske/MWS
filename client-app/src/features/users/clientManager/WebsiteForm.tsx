import { Form, Formik } from "formik";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { UserSimple } from "../../../app/models/user";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from "uuid";

interface Props{
    user:UserSimple;
}

export default function WebsiteForm({user}:Props)
{
    const {userStore} = useStore();
    const {createWebsite} = userStore;

    let handleCreateWebsite = (website) => {
        const newWebsite={
            ...website,
            id:uuid()
        }
        createWebsite(newWebsite);
    }
    return(
        <Formik 
            initialValues = {{
                id: '',
                progress:0,
                userId:user.id,
                url:'',
            }} 
            onSubmit={values => handleCreateWebsite(values)}>
            {({handleSubmit}) => (
            <Form className="ui form" onSubmit={handleSubmit}  autoComplete='off'>
                <Header as='h1' style={{color:'black'}}>Create Website Instance</Header>
                <MyTextInput placeholder='Any Progress?' name='progress'/>
                <MyTextInput placeholder='URL' name='url'/>
                <Button positive type='submit'>Submit</Button>
            </Form>)}
        </Formik>
    )
}