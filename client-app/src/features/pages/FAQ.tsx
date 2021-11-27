import React, { useState } from "react";
import { Accordion,Header,Icon, Segment } from "semantic-ui-react";

export default function FAQ(){
    const [activeIndex, setActiveIndex] = useState(-1);
    
    const handleClick = (e,titleIndex) =>{
        const {index} = titleIndex;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    }

    return(
        <Segment className='ui segment content-container'>
            <title>MWS | FAQ</title>
            <Header as='h1' className='black-header'>F.A.Q</Header>
            <Accordion styled className='faq-accordion'>
                <Accordion.Title index={0} onClick={handleClick}>
                    <Icon name="dropdown"/>
                    FAQ #1
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <p>Answer #1</p>
                </Accordion.Content>
                <Accordion.Title index={1} onClick={handleClick}>
                    <Icon name="dropdown"/>
                    FAQ #2
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <p>Answer #2</p>
                </Accordion.Content>
            </Accordion>
        </Segment>


    )
}