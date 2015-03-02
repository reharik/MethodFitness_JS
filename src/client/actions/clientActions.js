"use strict";


var Fluxxor = require("fluxxor"),
  constants = require("./../mfConstants");

var actions = {
  onTrainerGeneratedClientSignedUp: function(client){
    this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP, {client: client});

    clientRepository.save(function(client) {
      this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP_SUCCESS, {words: words});
    }.bind(this), function(error) {
      this.dispatch(constants.CLIENTS.TRAINER_GENERATED_CLIENT_SIGNED_UP_FAIL, {error: error});
    }.bind(this));
  }
};
