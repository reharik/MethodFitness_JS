var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");

var constants = require("./mfConstants");
var clientRepository = require("./repositories/clientRepository");
var userRepository = require("./repositories/userRepository");
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
//var routes = require("./routes");

  // stores
var AuthStore = Fluxxor.createStore({
  initialize: function () {
    this.loading = false;
    this.error = null;
    this._user = null;

    this.bindActions(
      constants.USERS.FETCH_USER, this.onFetchUser,
      constants.USERS.FETCH_USER_SUCCESS, this.onFetchUserSuccess,
      constants.USERS.FETCH_USER_FAIL, this.onFetchUserFail,
      constants.USERS.SIGN_IN, this.onSignIn,
      constants.USERS.SIGN_IN_SUCCESS, this.onSignInSuccess,
      constants.USERS.SIGN_IN_FAIL, this.onSignInFail,
      constants.USERS.SIGN_OUT, this.onSignOut,
      constants.USERS.SIGN_OUT_SUCCESS, this.onSignOutSuccess,
      constants.USERS.SIGN_OUT_FAIL, this.onSignOutFail,
      constants.USERS.SIGN_UP, this.onSignUp,
      constants.USERS.SIGN_UP_SUCCESS, this.onSignUpSuccess,
      constants.USERS.SIGN_UP_FAIL, this.onSignUpFail
    )
  },

  onFetchUser: function () {
    this.loading = true;
    this.emit("change");
  },
  onFetchUserSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload.user;
    this.emit("change");
  },
  onFetchUserFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  onSignIn: function () {
    this.loading = true;
    this.emit("change");
  },
  onSignInSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload.user;
    this.emit("change");
  },
  onSignInFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  onSignOut: function () {
    this.loading = true;
    this.emit("change");
  },
  onSignOutSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload.user;
    this.emit("change");
  },
  onSignOutFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  onSignUp: function () {
    this.loading = true;
    this.emit("change");
  },
  onSignUpSuccess: function (payload) {
    this.loading = false;
    this.error = null;

    this._user = payload.user;
    this.emit("change");
  },
  onSignUpFail: function (payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },

  isLoggedIn: function () {
    return this._user !== null;
  },
  getUser: function () {
    return this._user;
  }

});

var actions = {
  TrainerGeneratedClientSignedUp: function(client){
    this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP, {client: client});

    clientRepository.save(function(client) {
      this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP_SUCCESS, {words: words});
    }.bind(this), function(error) {
      this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP_FAIL, {error: error});
    }.bind(this));
  },
  loadClients: function(){
    this.dispatch(constants.CLIENTS.LOAD_CLIENTS, {});

    clientRepository.loadClientSummaries(function(payload) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENTS_SUCCESS, {clientSummaries: payload.clientSummaries});
    }.bind(this), function(error) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENTS_FAIL, {error: error});
    }.bind(this));
  },
  fetchUser: function(){
    this.dispatch(constants.USERS.FETCH_USER, {});

    userRepository.fetchUser(function(payload) {
      this.dispatch(constants.USERS.FETCH_USER_SUCCESS, {user: payload?payload.user:{}});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.FETCH_USER_FAIL, {error: error});
    }.bind(this));
  },
  signIn: function(username, password){
    this.dispatch(constants.USERS.SIGN_IN, {});

    userRepository.signIn({ username: username, password: password },function(payload) {
      this.dispatch(constants.USERS.SIGN_IN_SUCCESS, {user: payload.user});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.SIGN_IN_FAIL, {error: error});
    }.bind(this));
  },
  signOut: function(){
    this.dispatch(constants.USERS.SIGN_OUT, {});

    userRepository.signOut(function() {
      this.dispatch(constants.USERS.SIGN_OUT_SUCCESS, {});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.SIGN_OUT_FAIL, {error: error});
    }.bind(this));
  }
};

var clientStore = Fluxxor.createStore({
  initialize: function(){
    this.loading = false;
    this.error = null;
    this.clients = [];

    this.bindActions(
      constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP, this.onTrainerGeneratedClientSignedUp
    );
  },
  onTrainerGeneratedClientSignedUp: function(payload){
    // do something with payload
    this.emit("change");
  },
  getState:function(){
    return{
      clients: this.clients
    };
  }
});

var clientSummaryStore = Fluxxor.createStore({
  initialize: function() {
    this.loading = false;
    this.error = null;
    this.clientSummaries = [];

    this.bindActions(
      constants.CLIENTS.LOAD_CLIENTS, this.onLoadClients,
      constants.CLIENTS.LOAD_CLIENTS_SUCCESS, this.onLoadClientsSuccess,
      constants.CLIENTS.LOAD_CLIENTS_FAIL, this.onLoadClientsFail
    );
  },
  onLoadClients: function() {
    this.loading = true;
    this.emit("change");
  },

  onLoadClientsSuccess: function(payload) {
    this.loading = false;
    this.error = null;

    this.clientSummaries = payload.clientSummaries.reduce(function(acc, clientSummary) {
      acc[clientSummary._Id] = {id: clientSummary._Id, Summary: clientSummary, status: "OK"};
      return acc;
    }, {});
    this.emit("change");
  },

  onLoadClientsFail: function(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit("change");
  },
  getClientSummaries: function(){
    return this.clientSummaries;
  },
  getLoading: function(){
    return this.loading;
  },
  getError: function(){
    return this.errror;
  }

});
//var   authStore = require("./stores/authStore");
//var   clientStore = require("./stores/clientStore");
//var   clientSummaryStore = require("./stores/clientSummaryStore");
//var   clientActions = require("./actions/clientActions");
// pages
//var Root = require("./pages/root");
//var ListClients = require("./pages/listClients");
//var AddClient = require("./pages/addClient");
//var NotFoundPage = require("./pages/notfound");
//var NullPage = require("./pages/null");
//var SignInPage = require("./pages/signin");
//var SignUpPage = require("./pages/signup");
//var SignOut = require("./pages/signout");



//require("./less/main.less");
var router = Router.create({routes: routes});
//
var stores = {
  authStore: new AuthStore(),//,
  clientStore: new clientStore(),
  clientSummaryStore: new clientSummaryStore()
};

var flux = new Fluxxor.Flux(stores, actions);
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

//var Root = require("./pages/root");
var ListClients = require("./pages/listClients");
var AddClient = require("./pages/addClient");
var NotFoundPage = require("./pages/notfound");
var NullPage = require("./pages/null");
var SignInPage = require("./pages/signin");
var SignUpPage = require("./pages/signup");
var SignOut = require("./pages/signout");
var Navbar = require("./components/navbar");
var Layout = require("./pages/layout");

var FluxMixin = Fluxxor.FluxMixin(React);
var Root = React.createClass({
  displayName: "Root",
  mixins: [FluxMixin],
  getStateFromFlux: function(){
    return{
    };
  },

  render: function () {
    return (
      <div>
        <Navbar brand="Method Fitness"  />
        <Layout  />
      </div>
    );
  }
});


var routes = (
  <Route handler={Root} path="/">
    <DefaultRoute name="client-list" handler={ListClients} />
    <Route name="add-client" path="/addclient" handler={AddClient} />
    <Route name="profile" path="/profile" handler={NullPage} />
    <Route name="sign-in" path="/signin" handler={SignInPage} />
    <Route name="sign-up" path="/signup" handler={SignUpPage} />
    <Route name="sign-out" path="/signout" handler={SignOut} />
    <NotFoundRoute handler={NotFoundPage} />
  </Route>
);
var container = document.getElementById("content");

Router.run(routes, function(Handler) {
  React.render(
    <Handler flux={flux} params="test" />,
    container
  );
});
