var React = require("react");
var Fluxxor = require("fluxxor");
var Router = require("react-router");

var constants = require("./mfConstants");
var routes = require("./routes");
var actions = require("./actions/actions");
var AuthStore = require("./stores/authStore");
var ClientStore = require("./stores/clientStore");
var ClientSummaryStore = require("./stores/clientSummaryStore");


//require("./less/main.less");

var stores = {
  authStore: new AuthStore(),//,
  clientStore: new ClientStore(),
  clientSummaryStore: new ClientSummaryStore()
};

var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;
flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

var container = document.getElementById("content");

Router.run(routes, function(Handler) {
  React.render(
    <Handler flux={flux} />,
    container
  );
});
