import { Formik } from "formik";
import React from "react";
import { Segment } from "semantic-ui-react";


export default function PaymentForm()
{
    return(
        <Segment>
            <Formik
                initialValues={{cardNumber:"", nameOnCard:""}}
                onSubmit={values => console.log(values)}
            >

            </Formik>
        </Segment>
    )
}