var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");
var routes = require("./routes");

  // stores
var   authStore = require("./stores/authStore");
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
//var stores = {
//  authStore: new authStore()//,
//  //clientStore: clientStore,
//  //clientSummaryStore: clientSummaryStore
//};

var flux = new Fluxxor.Flux(stores, null);
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

var container = document.getElementById("content");

router.run(function (Handler) {
  React.render(<Handler flux={flux} />, container);
});
