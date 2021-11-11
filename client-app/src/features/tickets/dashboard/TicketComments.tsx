import { Field, FieldProps, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Segment, Comment, Button } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import {formatDistanceToNow} from 'date-fns';

interface Props{
    ticketId: string;
}

export default observer(function TicketComments({ticketId}:Props)
{
    const {commentStore} = useStore();

    useEffect(() =>{
        if(ticketId){
            commentStore.createHubConnection(ticketId);
        }
        return () => {
            commentStore.clearComments();
        }
    }, [commentStore, ticketId]);

    let getComments = () => {
        var ticketComments = commentStore.ticketComments.get(ticketId);
        var comments = [];

        if (!ticketComments) return comments; 

        for(var comment of ticketComments){

            comments.push(
                    <Comment key={comment.id}>
                        <Comment.Content>
                            <Comment.Author>{comment.username}</Comment.Author>
                            <Comment.Metadata>
                                <div>{formatDistanceToNow(comment.createAt)} ago</div>
                            </Comment.Metadata>
                            <Comment.Text style={{whiteSpace:"pre-wrap"}}>{comment.body}</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                );
        }
        return comments;
    }
    return(
        <Segment clearing>
            <Comment.Group>
                {getComments()}
                <Formik
                    onSubmit={(values, {resetForm}) => 
                        commentStore.addComment(values).then(() => resetForm())}
                    initialValues={{ticketId: ticketId, body:''}}
                    validationSchema={Yup.object({
                        body: Yup.string().required()
                    })}    
                >
                    {({isValid, handleSubmit}) => (
                        <Form className='ui form'>
                            <Field name='body'>
                                {(props: FieldProps) =>(
                                    <div style={{position:'relative'}}>
                                        <textarea
                                            placeholder="Add comment (Enter to submit; SHIFT+Enter for new line)"
                                            rows={2}
                                            {...props.field}
                                            onKeyPress={e => {
                                                if(e.key === 'Enter' && e.shiftKey){
                                                    return;
                                                }
                                                if(e.key === 'Enter' && !e.shiftKey){
                                                    e.preventDefault();
                                                    isValid && handleSubmit();
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                            </Field>
                        </Form>
                    )}
                    
                </Formik>

            </Comment.Group>
        </Segment>
    )
})