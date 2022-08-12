import {Button, Card,Image} from "semantic-ui-react";

interface Props{
    image:string;
    href?:string;
    code_href?:string;
    width?:number;
    height?:number;
    header?:string;
    description?:string;
    placeholder?:string;
}

export default function Slide(props:Props){
    return(

        <Card href={props.href} style={{width:"300px", height:"350px"}}>
            <Image src={props.image}></Image>
            <Card.Content>
                <Card.Header>{props.header}</Card.Header>
                <Card.Description>
                    Click to give it a try!
                    <Button href={props.href} positive compact floated="right" content="Site" size="mini"/>
                    <Button href={props.code_href} positive compact floated="right" content="Code" size="mini"/>
                </Card.Description>
            </Card.Content>
        </Card>
    )
}