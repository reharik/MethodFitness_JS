"use strict";

var React = require("react");
//
//var Navbar = require("./../components/navbar");
//var Layout = require("./layout");

var Root = React.createClass({
  displayName: "Root",

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
