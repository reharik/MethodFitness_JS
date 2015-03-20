
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
  LoadClients: function(){
    this.dispatch(constants.CLIENTS.LOAD_CLIENTS, {});

    clientRepository.loadClientSummaries(function(payload) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENTS_SUCCESS, {clientSummaries: payload.clientSummaries});
    }.bind(this), function(error) {
      this.dispatch(constants.CLIENTS.LOAD_CLIENTS_FAIL, {error: error});
    }.bind(this));
  },
  FetchUser: function(){
    this.dispatch(constants.USERS.FETCH_USER, {});

    userRepository[constants.USERS.FETCH_USER](function(payload) {
      this.dispatch(constants.USERS.FETCH_USER_SUCCESS, {user: payload?payload.user:{}});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.FETCH_USER_FAIL, {error: error});
    }.bind(this));
  },
  SignIn: function(username, password){
    this.dispatch(constants.USERS.SIGN_IN, {});

    userRepository[constants.USERS.SIGN_IN]({ username: username, password: password },function(payload) {
      this.dispatch(constants.USERS.SIGN_IN_SUCCESS, {user: payload.user});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.SIGN_IN_FAIL, {error: error});
    }.bind(this));
  },
  SignOut: function(){
    this.dispatch(constants.USERS.SIGN_OUT, {});

    userRepository.signOut(function() {
      this.dispatch(constants.USERS.SIGN_OUT_SUCCESS, {});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.SIGN_OUT_FAIL, {error: error});
    }.bind(this));
  },
  SignUp: function(newUser){
    this.dispatch(constants.USERS.SIGN_UP, {});

    userRepository[constants.USERS.SIGN_UP](newUser, function(payload) {
      userRepository[constants.USERS.FETCH_USER](function(user) {
        payload.user = user;
      }, function(_error){
        this.dispatch(constants.USERS.SIGN_UP_FAIL, {error: _error});
        return;
      });
      this.dispatch(constants.USERS.SIGN_UP_SUCCESS, {user: payload.user});
    }.bind(this), function(error) {
      this.dispatch(constants.USERS.SIGN_UP_FAIL, {error: error});
    }.bind(this));
  },
};

module.exports = actions;
