import { Field, FieldProps, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";

interface Props {
    websiteId: string
}

export default observer(function ProgressNotes({websiteId} : Props)
{
    const {progressStore} = useStore();

    useEffect(() => {
        progressStore.createHubConnection(websiteId);
    }, [progressStore, websiteId])

    return(

        <>
            <Formik
                onSubmit={(values, {resetForm}) => 
                    progressStore.addNote(values).then(() => resetForm())}
                initialValues={{websiteId: websiteId, body:'', progressAmount:0}}
                validationSchema={Yup.object({
                    progressAmount: Yup.number().required(),
                    body: Yup.string().required()
                })}    
            >
                {({isValid, handleSubmit}) => (
                    <Form className='ui form'>
                        <Header as="h3" content="Progress Amount" className="black-header"></Header>
                        <Field type="number" name="progressAmount"></Field>
                        <Header as="h3" content="Note" className="black-header"></Header>
                        <Field name='body'>
                            {(props: FieldProps) =>(
                                <div style={{position:'relative'}}>
                                    <textarea
                                        placeholder="Add Progress Note (Enter to submit; SHIFT+Enter for new line)"
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

        </>

    )
})