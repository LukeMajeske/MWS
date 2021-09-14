import React, { Fragment } from "react";
import { Container, Header, Segment, Image, Card, Grid } from "semantic-ui-react";
import Portfolio from "./Portfolio";
import SlideShow from "./SlideShow";


export default function HomePage(){
    return(
        <Fragment>
            <SlideShow/>
            <div className="segment-div">
                <Header as="h1">Meet Luke!</Header>
                <Grid>
                    <Grid.Column width="6">
                        <Image src='../assets/luke-web-pic.jpg' size="large" rounded></Image>
                    </Grid.Column>
                    <Grid.Column width='10'>
                        <Segment raised style={{height:'100%'}}>
                            <Header as="h1" style={{color:"black"}}>What I Do</Header>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
            <Portfolio/>
        </Fragment>

    )
}