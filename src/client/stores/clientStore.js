//"use strict";
//
//
//var Fluxxor = require("fluxxor"),
//  constants = require("./../mfConstants");
//
//
//var clientStore = Fluxxor.createStore({
//  initalize: function(){
//    this.loading = false;
//    this.error = null;
//    this.clients = [];
//
//    this.bindActions(
//      constants.TRAINER_GENERATED_CLIENT_SIGNED_UP, this.onTrainerGeneratedClientSignedUp
//    );
//  },
//  onTrainerGeneratedClientSignedUp: function(payload){
//    // do something with payload
//    this.emit("change");
//  },
//  getState:function(){
//    return{
//      clients: this.clients
//    };
//  }
//});
//
//module.export = clientStore;
