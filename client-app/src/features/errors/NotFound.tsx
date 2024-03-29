import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";


export default function NotFound(){
    return(
        <Segment placeholder>
            <Header icon style={{color:"black"}}>
                <Icon name='search'/>
                Oops - we've looked everywhere and could not find this page.
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/" primary>
                    Return to Home Page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}