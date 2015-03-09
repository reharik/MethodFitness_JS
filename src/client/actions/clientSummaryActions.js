"use strict";


var Fluxxor = require("fluxxor"),
  constants = require("./../mfConstants"),
  clientRepository = require("./../repositories/clientRepository");

var actions = {
  loadClients: function(){
    this.dispatch(constants.CLIENTS.LOAD_CLIENTS, {});

    clientRepository.loadClientSummaries(function(payload) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENTS_SUCCESS, {clientSummaries: payload.clientSummaries});
    }.bind(this), function(error) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENTS_FAIL, {error: error});
    }.bind(this));
  }
};
