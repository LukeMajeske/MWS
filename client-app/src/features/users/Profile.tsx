import React from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";



export default function Profile(){
    return(
        <Segment className='profile'>
            <Header className="profile-header" as='h1' style={{color:'black'}}>My Profile</Header>

            <Grid>
                <Grid.Column width='8'>
                    <Segment raised>
                        <Header as='h1' style={{color:'black'}}>Current Balance</Header>
                        <Header as='h1' style={{color:'black'}}>$0.00</Header>
                        <Button positive>Pay Balance</Button>
                        <Button floated='right' color='blue'>View History</Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column width='8'>
                    <Segment raised>
                        <Header as='h1' style={{color:'black'}}>My Websites</Header>
                    </Segment>

                </Grid.Column>
            </Grid>

        </Segment>
        
    )
}