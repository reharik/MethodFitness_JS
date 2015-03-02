"use strict";


var Fluxxor = require("fluxxor"),
  constants = require("./../mfConstants");


var clientSummaryStore = Fluxxor.createStore({
  initalize: function() {
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
    }

});

module.export = new clientSummaryStore();
