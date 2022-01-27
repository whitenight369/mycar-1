import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
// import Admin from './admin';
import IRouter from './Router';

ReactDOM.render(
  <Provider store={store}>
    <IRouter />
  </Provider>,
  document.getElementById('root')
);
