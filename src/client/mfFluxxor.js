var React = require("react"),
  Fluxxor = require("fluxxor"),
  clientStore = require("./stores/clientStore.js"),
  clientSummaryStore = require("./stores/clientSummaryStore.js"),
  clientActions = require("./actions/clientActions");

var stores = {
  clientStore: clientStore,
  clientSummaryStore: clientSummaryStore
};
var flux = new Fluxxor.Flux(stores, clientActions);
window.flux = flux;

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

module.exports = flux;
