import React from "react";
import { Container, Grid, Header, Segment} from "semantic-ui-react";
import QuoteForm from "../home/QuoteForm";

export default function Contact(){
    
    return(
            <>
                <Segment raised className='contact-form-container'>
                    <title>MWS | Contact</title>
                    <Grid>
                    <Grid.Column width='8'>
                        <Segment className="contact-info">
                            <Header as="h1" content="Hire Me "></Header>
                        </Segment>

                    </Grid.Column>
                        <Grid.Column width='8'>
                            <QuoteForm/>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </>
    )
}