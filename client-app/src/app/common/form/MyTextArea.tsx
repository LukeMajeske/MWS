import { useField } from "formik";
import React from "react";
import { Form } from "semantic-ui-react";

interface Props{
    placeholder:string;
    name:string;
    type?:string;
    label?:string;
}

export default function MyTextArea(props:Props){
    const[field,meta] = useField(props.name);
    return(
        <Form.Field>
            <label>{props.label}</label>
            <textarea {...field} {...props}/>
        </Form.Field>
    )

}