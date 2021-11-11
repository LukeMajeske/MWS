import React, { Fragment, useEffect } from 'react';
import './App.css';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Footer from './Footer';
import Profile from '../../features/users/Profile';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modals/ModalContainer';
import FAQ from '../../features/pages/FAQ';
import Contact from '../../features/pages/Contact';
import ClientManager from '../../features/users/clientManager/ClientManager';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';



function App() {
  const {commonStore, userStore} = useStore();

  useEffect(() =>{
    if (commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right' hideProgressBar/>
        <NavBar/>
        <div id='page-container'>
          <div id='content-wrapper'>
              <Switch>
                <Route exact path='/' component={HomePage}></Route>
                <Route path='/faq' component={FAQ}></Route>
                <Route path='/tickets' component={TicketDashboard}></Route>
                <Route path='/clientManager' component={ClientManager}></Route>
                <Route path='/contact' component={Contact}></Route>
                <Route path='/profile' component={Profile}></Route>
                <Route path='/login' component={LoginForm}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
            <div>
            <Footer/>
            </div>
        </div>

    </Fragment>
  );
}

export default observer(App);
