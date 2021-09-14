import React, { Fragment } from 'react';
import './App.css';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';
import NavBar from './NavBar';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Footer from './Footer';
import Profile from '../../features/client-profile/Profile';


function App() {
  return (
    <Fragment>
      <NavBar/>
      <Route exact path='/' component={HomePage}></Route>
      <Route path='/tickets' component={TicketDashboard}></Route>
      <Route path='/profile' component={Profile}></Route>
      <Footer/>
    </Fragment>
  );
}

export default App;
