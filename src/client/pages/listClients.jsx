"use strict";
var React = require("react");
var Fluxxor = require("fluxxor");
var Griddle = require('griddle-react');
var Authentication = require("../mixins/authentication");
var _ = require("lodash");

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  displayName: "Client List",
  mixins: [FluxMixin, StoreWatchMixin("clientSummaryStore")],//,Authentication ],



  getStateFromFlux: function(){
    var store = this.getFlux().store("clientSummaryStore");
    return {
      loading: store.getLoading,
      error: store.getError,
      clientSummaries: _.values(store.getClientSummaries())
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
