"use strict";

var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var flux = require("./mfFluxxor");


//var App = require("./app");
var ListClients = require("./pages/listClients");
var AddClient = require("./pages/addClient");
var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");

var container = document.getElementById("content");

var routes = (
  <Route>
    <DefaultRoute name="client-list" handler={ListClients} />
    <Route name="add-client" path="/addclient" handler={AddClient} />
    <Route name="profile" path="/profile" handler={NullPage} />
    <Route name="sign-in" path="/signin" handler={SignInPage} />
    <Route name="sign-up" path="/signup" handler={SignUpPage} />
    <Route name="sign-out" path="/signout" handler={SignOut} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);


Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler flux={flux} />, container);
});
