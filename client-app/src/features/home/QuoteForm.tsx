import React from "react";
import {Form, Header, Input} from "semantic-ui-react";


export default function QuoteForm(){
    return(
        <Form className="quoteForm">
            <Header>Contact Luke!</Header>
            <Form.Field 
                id='form-input-control-error-email'
                control={Input}
                label='Email'
                placeholder='email@email.com'
                error={{
                    content: 'Please enter a valid email address',
                    pointing: 'below',
                }}
            />
            <Form.TextArea className='quote-description'
                label='Comment'          
            /> 
        </Form>
    )
}