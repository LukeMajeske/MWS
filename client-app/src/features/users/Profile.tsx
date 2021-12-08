import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import TransactionHistory from "../payments/TransactionHistory";
import ProgressFeed from "./ProgressFeed";
import WebsiteItem from "./WebsiteItem";



export default observer(function Profile(){
    const {userStore, ticketStore} = useStore();
    const {user} = userStore;
    const {ticketRegistry} = ticketStore;

    useEffect(() => {
        if(user == null){
            userStore.getUser();
        }
        //Get tickets for currently logged in user
        ticketStore.loadTickets();
    },[user, userStore, ticketStore,ticketRegistry]);

    function displayWebsites(){
        var websites:JSX.Element[] = [];
        if(user=== null || user.websites === null || user.websites.length === 0){   
            websites.push(<Segment placeholder>
                <Header className="black-header">No Websites Found</Header>
            </Segment>);
            return websites;
        }
        user.websites.forEach(site => websites.push(<WebsiteItem key={site.id} website={site}></WebsiteItem>));

        return websites;
    }
    return(
        <Segment className='content-container'>
            <title>MWS | My Profile</title>
            <Header className="profile-header" as='h1' style={{color:'black'}}>My Profile</Header>
            
            <Grid>
                <Grid.Column width='8'>
                    <Segment raised>
                        <Header as='h1' style={{color:'black'}}>Current Balance</Header>
                        <TransactionHistory/>
                        <Button positive>Pay Balance</Button>
                        <Button floated='right' color='blue'>View History</Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column width='8'>
                    <Segment raised>
                        <Header as='h1' style={{color:'black'}}>My Websites</Header>
                        <Segment.Group>
                            {displayWebsites()}
                        </Segment.Group>
                    </Segment>

                </Grid.Column>
            </Grid>
            <ProgressFeed/>

        </Segment>
        
    )
})