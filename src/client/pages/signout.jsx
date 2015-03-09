var React = require("react");
var AuthStore = require("../stores/authStore");
var Router = require("react-router");

var SignOut = React.createClass({
  mixins: [ Router.Navigation ],

  componentWillMount: function () {
    AuthStore.signOut(function () {
      this.replaceWith("index");
    }.bind(this));
  },

  render: function () {
    return null;
  }
});

module.exports = SignOut;
