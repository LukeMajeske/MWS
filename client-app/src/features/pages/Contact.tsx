import React from "react";
import { Container, Grid, Segment} from "semantic-ui-react";
import QuoteForm from "../home/QuoteForm";

export default function Contact(){
    
    return(
            <>
                <Segment className='contact-form-container'>
                    <title>MWS | Contact</title>
                    <Grid>
                    <Grid.Column width='8'>
                        <Container/>

                    </Grid.Column>
                        <Grid.Column width='8'>
                            <QuoteForm/>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </>
    )
}