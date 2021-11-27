import React from "react";
import {Image} from "semantic-ui-react";

export default function Footer(){
    return(
        <footer>
            <Image src={'/assets/mws-logo-512.png'} size='mini'/>
            <p>Copyright 2021 MWS, All Rights Reserved</p>
        </footer>

    )
}