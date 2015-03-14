var SignIn = require("../pages/signin");

var Authentication = {
  statics: {
    willTransitionTo: function (transition, params) {
      debugger;
      var authStore = this.getFlux().store("authStore");
      if (!authStore.isLoggedIn()) {
        SignIn.attemptedTransition = transition;
        transition.redirect("sign-in");
      }
    }
  }
};

module.exports = Authentication;
