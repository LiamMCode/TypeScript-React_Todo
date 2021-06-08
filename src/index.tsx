import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
    <React.Fragment>
    <BrowserRouter>
      <Route path='/' exact component={App}></Route>
    </BrowserRouter>
    </React.Fragment>, document.getElementById('root')
  );
