import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from '../component/pages/login/LoginPage';
import RequestPage from '../component/pages/request/RequestPage';
import LandingPage from '../component/landing/LandingPage';

const AppRoutes: React.FC<unknown> = (props) => {

  return (
    <Switch>
      <Route  path='/home'>
        <LandingPage />
      </Route>
      
      <Route path='/login'>
        <LoginPage />
      </Route>
      <Route path='/request'>
        <RequestPage />
      </Route>
      <Route path='/'>
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
};

export default AppRoutes;