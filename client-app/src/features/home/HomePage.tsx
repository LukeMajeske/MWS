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
                <Header as="h1">Meet Luke!</Header>
                <Grid>
                    <Grid.Column>
                        <div className="about">
                            <Image src='../assets/luke-web-pic.jpg' size="large" rounded></Image>
                            <Segment className="about-section" raised style={{height:'100%'}}>
                                <Header as="h1" style={{color:"black"}}>My Goal</Header>
                                <p className="my-goal-text">
                                    Create fast and robust Single Page Applications <br/>
                                    supported by secure RESTful APIs <br/> 
                                    that also meet high 
                                    standards in areas of <br/>performance, design and ease of use. </p>
                            </Segment>
                            <Segment className="about-section" raised style={{height:'100%'}}>
                                <Header as="h1" style={{color:"black"}}>My Tools</Header>
                                <div className="my-tools">

                                    <Image rounded as="a" href="https://reactjs.org/" size="small" src="../logo512.png"></Image>
                                    <Image rounded as="a" href="https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet" size="small" src="../assets/NET_Core_Logo.png"></Image>
                                    <Image rounded as="a" href="https://www.postgresql.org/" size="small" src="../assets/postgresql.png"></Image>
                                </div>
                            </Segment>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>
            <Portfolio/>
        </Fragment>

    )
}