"use strict";

var React = require("react");
var routes = require("./routes");

var Navbar = require("./components/navbar");
var Layout = require("./pages/layout");

var App = React.createClass({
  displayName: "App",

  getStateFromFlux: function(){
    return{
    };
  },

  render: function () {
    return (
      <div>
      <Navbar brand="Method Fitness" />
      <Layout />
      </div>
    );
  }
});
