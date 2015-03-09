var SignIn = require("../pages/signin");
//var AuthStore = require("../stores/authStore");

var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var authStore = this.getFlux().store("authStore");
      if (!authStore.isLoggedIn()) {
        SignIn.attemptedTransition = transition;
        transition.redirect("sign-in");
      }
    }
  }
};

module.exports = Authentication;
