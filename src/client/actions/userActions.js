//"use strict";
//
//
//var Fluxxor = require("fluxxor"),
//  constants = require("./../mfConstants"),
//  userRepository = require("./../repositories/userRepository");
//
//var actions = {
//  fetchUser: function(){
//    this.dispatch(constants.USERS.FETCH_USER, {});
//
//    userRepository.fetchUser(function(payload) {
//      this.dispatch(constants.USERS.FETCH_USER_SUCCESS, {user: payload.user});
//    }.bind(this), function(error) {
//      this.dispatch(constants.USERS.FETCH_USER_FAIL, {error: error});
//    }.bind(this));
//  },
//  signIn: function(username, password){
//    this.dispatch(constants.USERS.SIGN_IN, {});
//
//    userRepository.signIn({ username: username, password: password },function(payload) {
//      this.dispatch(constants.USERS.SIGN_IN_SUCCESS, {user: payload.user});
//    }.bind(this), function(error) {
//      this.dispatch(constants.USERS.SIGN_IN_FAIL, {error: error});
//    }.bind(this));
//  },
//  signOut: function(){
//    this.dispatch(constants.USERS.SIGN_OUT, {});
//
//    userRepository.signOut(function() {
//      this.dispatch(constants.USERS.SIGN_OUT_SUCCESS, {});
//    }.bind(this), function(error) {
//      this.dispatch(constants.USERS.SIGN_OUT_FAIL, {error: error});
//    }.bind(this));
//  }
//};
