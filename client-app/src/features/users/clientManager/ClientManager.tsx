
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { UserFormValues } from "../../../app/models/user";
import { useStore } from "../../../app/stores/store";
import ClientItem from "./ClientItem";


export default observer(function ClientManager(){
    const {userStore, modalStore} = useStore();
    const {clientManager,register} = userStore;
    const {openModal} = modalStore;

    useEffect(() => {
        userStore.getClients()
    },[userStore,clientManager]);

    function returnClients(){
        var client_items = [];
        for(var client of clientManager.values()){
            if(!client.role.includes("SuperAdmin")){
                client_items.push(<ClientItem key={client.id} client={client}/>);
            }

        }
        return client_items;
    }

    let registerUserForm = () => {
        return(
            <Formik
                initialValues={{email:"", username:"", password:""}}
                onSubmit={(values:UserFormValues)=> {register(values)}}
            > 
                {({handleSubmit}) => (<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header className="black-header" as="h1" content="Register User"></Header>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='username' placeholder='Username'/>
                    <MyTextInput type="password" name='password' placeholder='Password'/>
                    <Button positive content="Send" type="submit"/>
                </Form>)}
            </Formik>
        )
    }

    return(
        <Segment>
            <title>MWS | Client Dashboard</title>
            <Button positive content="+ Create User" onClick={()=> openModal(registerUserForm())}/>
            {returnClients()}
        </Segment>
    )

})