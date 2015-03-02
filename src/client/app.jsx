"use strict";

var React = require("react");
var Navbar = require("./components/navbar");
var Layout = require("./pages/layout");
var mfFluxxor = require("./mfFluxxor");
var Fluxxor = require("Fluxxor");
//var routes = require("./routes");
var Router = require("react-router");
var Route = Router.Route;
console.log()
var     container = document.getElementById("content"),
    AuthStore = require("./stores/auth");

var that = this;

var App = React.createClass({
  displayName: "App",

  getInitialState: function() {
    return {
      hasLoaded: false
    };
  },
  getStateFromFlux: function(){
  //    var flux = this.getFlux();
  //  return{
  //  };
  },

  componentWillMount: function () {
    AuthStore.init();
  },
  componentDidMount: function () {
    AuthStore.addChangeListener(this.updateLoading);
  },
  componentWillUnmount: function () {
    AuthStore.removeChangeListener(this.updateLoading);
  },
  updateLoading: function () {
    AuthStore.removeChangeListener(this.updateLoading);
    this.setState({
      hasLoaded: true
    });
  },

  render: function () {
    return (
      <div>
      <Navbar brand="Method Fitness" />
      <Layout hasLoaded={this.state.hasLoaded}/>
      </div>
    );
  }
});

var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var ListClients = require("./pages/listClients");
var AddClient = require("./pages/addClient");
var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");


var routes = (
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

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler flux={that.mfFluxxor} />, container);
});



