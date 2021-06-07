"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
require("./index.css");
var reportWebVitals_js_1 = require("./reportWebVitals.js");
var App_js_1 = require("./App.js");
var react_router_dom_1 = require("react-router-dom");
ReactDOM.render(<react_router_dom_1.BrowserRouter>
    <React.Fragment>
      <react_router_dom_1.Route path='/' exact component={App_js_1["default"]}></react_router_dom_1.Route>
    </React.Fragment>
    </react_router_dom_1.BrowserRouter>, document.getElementById('root'));
reportWebVitals_js_1["default"]();
