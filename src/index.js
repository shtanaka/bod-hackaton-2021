import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RematchProvider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

if (!window.Buffer) {
  window.Buffer = require('buffer').Buffer;
}

ReactDOM.render(
  <React.StrictMode>
    <RematchProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RematchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
