import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import './App.scss';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Mainpage from './components/layout/Mainpage';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
localStorage.token && setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Mainpage} />
            <Routes component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
