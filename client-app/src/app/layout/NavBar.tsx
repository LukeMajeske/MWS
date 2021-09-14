import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Image, Menu } from "semantic-ui-react";



export default function NavBar()
{
    return(
        <Menu borderless fixed='top'>
            <Menu.Item as={NavLink} to='/' exact>
                <Image src={'/assets/mws-logo-512.png'} size={"tiny"}></Image>
            </Menu.Item>
            <Menu.Item>About</Menu.Item>
            <Menu.Item>F.A.Q</Menu.Item>
            <Menu.Item>Contact</Menu.Item>
            <Menu.Item as={NavLink} to='/profile'>Profile</Menu.Item>
            <Menu.Item as={NavLink} to='/tickets'>Ticket Dashboard</Menu.Item>
            <Menu.Item position='right' borderless><Button className='login-btn' positive>Client Login</Button></Menu.Item>
        </Menu>
    )
}