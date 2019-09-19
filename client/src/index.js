import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import App from './App';
import Root from './components/Root';

ReactDOM.render(
    <Root store={configureStore()} >
      <App />
    </Root>,
  document.getElementById('root')
);
