import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux'
import configureStore from './store';
import Root from './Root'

ReactDOM.render(
 <Root store={configureStore()}>
 </Root>,
 document.getElementById('root')
);



