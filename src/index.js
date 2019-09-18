import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
import configureStore from './store';
import App from './App';
import Root from './Root'

ReactDOM.render(
 <Root store={configureStore()}>
  <App />
 </Root>,
 document.getElementById('root')
);



