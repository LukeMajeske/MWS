import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Label, Segment, Image } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";


export default observer(function LoginForm(){
    const {userStore} = useStore();
    return(
            <Formik
                initialValues={{email:'', password:'', error:null}}
                onSubmit={(values, {setErrors}) =>userStore.login(values).catch(error => 
                    setErrors({error: 'Invalid email or password'}))}
            >
                {({handleSubmit, isSubmitting, errors}) => (
                    <Form className='ui form login-form' onSubmit={handleSubmit} autoComplete='off'>
                        <Image className='login-img' src={'/assets/mws-logo-512.png'}  size={"tiny"}></Image>
                        <MyTextInput name='email' placeholder='Email'/>
                        <MyTextInput name='password' placeholder='Password' type='password'/>
                        <ErrorMessage
                            name='error' render={() => 
                            <Label style={{marginBottom:'10px'}} basic color='red' content={errors.error}></Label>}
                        />
                        <Button positive content='Login' type='submit' fluid/>
                    </Form>
                )}
            </Formik>
    )
})