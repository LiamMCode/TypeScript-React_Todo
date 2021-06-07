import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';

  ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route> React exact path = '/' component={App} </Route>
    </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
  );
reportWebVitals();