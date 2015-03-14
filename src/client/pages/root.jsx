"use strict";

var React = require("react");
var Navbar = require("./../components/navbar");
var Layout = require("./../pages/layout");
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React);

var Root = React.createClass({
  displayName: "Root",
  mixins: [FluxMixin],
  getStateFromFlux: function(){
    return{
    };
  },

  render: function () {
    return (
      <div>
        <Navbar brand="Method Fitness"  />
        <Layout  />
      </div>
    );
  }
});

module.exports = Root;
