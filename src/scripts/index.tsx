import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {BrowserRouter, Router, Route} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <Route path='/' exact component={App}></Route>
    </React.Fragment>
    </BrowserRouter>, document.getElementById('root')
  );
reportWebVitals();