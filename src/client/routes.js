var React = window.React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var ListClients = require("./pages/listClients");
var AddClient = require("./pages/addClient");
var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");


module.exports = (
  <Route handler={App} path="/">
    <DefaultRoute name="client-list" handler={ListClients} />
    <Route name="add-client" path="/addclient" handler={AddClient} />
    <Route name="profile" path="/profile" handler={NullPage} />
    <Route name="sign-in" path="/signin" handler={SignInPage} />
    <Route name="sign-up" path="/signup" handler={SignUpPage} />
    <Route name="sign-out" path="/signout" handler={SignOut} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);


