import React, { Fragment } from "react";
import { Header, Segment, Image,Grid } from "semantic-ui-react";
import Portfolio from "./Portfolio";
import SlideShow from "./SlideShow";


export default function HomePage(){
    return(
        <Fragment>
            <title>MWS | Home</title>
            <SlideShow/>
            <div className="segment-div">
                <Header as="h1">About Me!</Header>
                <Grid stackable centered columns={2}>
                    <Grid.Column>
                        <Segment className="about-section" raised style={{height:'100%'}}>
                            <Header as="h1" style={{color:"black"}}>My Goal</Header>
                            <p className="my-goal-text">
                                Create fast and robust Single Page Applications <br/>
                                supported by secure RESTful APIs <br/> 
                                that also meet high 
                                standards in areas of <br/>performance, design and ease of use. </p>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                            <Segment className="my-tools" raised style={{height:'100%'}}>
                                <Header as="h1" style={{color:"black"}}>My Tools</Header>
                                    <Grid centered columns={2}>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Image rounded as="a" 
                                                href="https://reactjs.org/" 
                                                size="small" 
                                                src="../logo512.png"
                                                ></Image>
                                            </Grid.Column>
                                            <Grid.Column >
                                                <Image rounded as="a" href="https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet" size="small" src="../assets/NET_Core_Logo.png"></Image>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column >
                                                <Image rounded as="a" href="https://www.postgresql.org/" size="small" src="../assets/postgresql.png"></Image>
                                            </Grid.Column>
                                            <Grid.Column>
                                            
                                                <Image rounded as="a" href="https://www.heroku.com/about" size="tiny" src="../assets/heroku-logo.png"></Image>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                            </Segment>
                    </Grid.Column>

                </Grid>
            </div>
            <Portfolio/>
        </Fragment>

    )
}