"use strict";

var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
//var DefaultRoute = Router.DefaultRoute;
//var NotFoundRoute = Router.NotFoundRoute;

var Root = require("./pages/root");
//var ListClients = require("./pages/listClients");
//var AddClient = require("./pages/addClient");
//var NotFoundPage = require("./pages/notfound");
//var NullPage = require("./pages/null");
//var SignInPage = require("./pages/signin");
//var SignUpPage = require("./pages/signup");
//var SignOut = require("./pages/signout");


var routes = (
  <Route handler={Root}>
  </Route>
);

module.exports = routes;
