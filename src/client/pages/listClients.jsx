"use strict";
var React = require("react");
var Fluxxor = require("fluxxor");
var Griddle = require('griddle-react');
var Authentication = require("../mixins/authentication");
var _ = require("lodash");
var constants = require("./../mfConstants");


var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  displayName: "Client List",
  mixins: [FluxMixin, StoreWatchMixin("clientSummaryStore"),Authentication ],

  statics: {
    resolve: constants.CLIENTS.LOAD_CLIENTS
  },

  getStateFromFlux: function(){
    var store = this.getFlux().store("clientSummaryStore");
      return {
      loading: store.getLoading(),
      error: store.getError(),
      clientSummaries: store.getClientSummaries()
    };
  },

  render: function() {
    return (
      <div>
        <h2>Client List</h2>
        <Griddle results={this.state.clientSummaries}  showSettings={true} useFixedHeader={true} enableInfiniteScroll={true} bodyHeight={400}/>
      </div>
    );
  }
});
