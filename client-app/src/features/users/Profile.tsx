import { JSXElement } from "@babel/types";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import WebsiteItem from "./WebsiteItem";



export default observer(function Profile(){
    const {userStore} = useStore();
    const {user} = userStore;

    useEffect(() => {
        if(user == null){
            userStore.getUser();
        }
    },[user]);

    function displayWebsites(){
        var websites:JSX.Element[] = [];
        if(user== null){
            return websites;
        }
        if(user.websites == null){
            return websites;
        }
        user.websites.forEach(site => websites.push(<WebsiteItem key={site.id} website={site}></WebsiteItem>));

        return websites;
    }
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
                        <Segment.Group>
                            {displayWebsites()}
                        </Segment.Group>
                    </Segment>

                </Grid.Column>
            </Grid>

        </Segment>
        
    )
})