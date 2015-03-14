
var constants = require("./../mfConstants");

var clientRepository = require("./../repositories/clientRepository");
var userRepository = require("./../repositories/userRepository");

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

module.exports = actions;
