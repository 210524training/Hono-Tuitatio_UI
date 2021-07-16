import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
// import 'materialize-css/dist/css/materialize.min.css';

import AppRoutes from './routes/AppRoutes';
import store from './store';
// import RequestForm from './component/RequestForm'

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router> 
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;
