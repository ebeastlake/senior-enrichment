'use strict'
import React from 'react';
import { Router } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import Root from './components/Root';
import 'bootstrap/dist/css/bootstrap.css';
import history from './history';

render (
  <Provider store={store}>
  	<Router history={history}>
    	<Root/>
    </Router>
  </Provider>,
  document.getElementById('main')
)