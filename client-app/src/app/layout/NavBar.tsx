import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Image, Menu } from "semantic-ui-react";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";



export default observer(function NavBar()
{
    const {userStore, modalStore} = useStore();

    function displayProfile(){
        if(userStore.isLoggedIn){
            return(<Menu.Item as={NavLink} to='/profile'>Profile</Menu.Item>);
        }
    }
    function displayTicketDashboard(){
        if(userStore.isLoggedIn){
            let roles = userStore.user.role;
            return(roles.map(role=>{
                if(role === "SuperAdmin"){
                    return(<Menu.Item as={NavLink} to='/tickets'>Ticket Dashboard</Menu.Item>);
                }
                else{
                    return null;
                }
            }));
        }
    }

    return(
        <div className='navbar-wrapper'>
        <Menu borderless fixed='top'>
            <Menu.Item as={NavLink} to='/' exact>
                <Image src={'/assets/mws-logo-512.png'} size={"tiny"}></Image>
            </Menu.Item>
            <Menu.Item>About</Menu.Item>
            <Menu.Item as={NavLink} to='/faq'>F.A.Q</Menu.Item>
            <Menu.Item as={NavLink} to='/contact'>Contact</Menu.Item>
            <Menu.Item>Portfolio</Menu.Item>
            {displayProfile()}
            {displayTicketDashboard()}
            {!userStore.isLoggedIn ? (
            <Menu.Item position='right'>
                <Button className='login-btn' onClick={() => modalStore.openModal(<LoginForm/>)} positive>Client Login</Button>
            </Menu.Item>) : (
             <Menu.Item position='right'>
                 Welcome {userStore.user.username}!
                <Button className='login-btn' onClick={() => userStore.logout()} as={Link} to='' negative>Logout</Button>
             </Menu.Item>)
            }
           
        </Menu>
        </div>
    )
})