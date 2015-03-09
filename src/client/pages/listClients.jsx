"use strict";
var React = require("react");
var Fluxxor = require("fluxxor");
var Griddle = require('griddle-react');
var Authentication = require("../mixins/authentication");

var FluxMixin = Fluxxor.FluxMixin(React),
  StoreWatchMixin = Fluxxor.StoreWatchMixin;

module.exports = React.createClass({
  displayName: "Client List",
  mixins: [FluxMixin, StoreWatchMixin("clientSummaryStore")],//,Authentication ],

  getInitialState:function(){
    return {
      clientSummaries: []
    };
  },

  getStateFromFlux: function(){
    console.log(this.getFlux());
    var store = this.getFlux().store("clientSummaryStore");
    return {
      loading: store.loading,
      error: store.error,
      clientSummaries: _.values(store.getClientSummaries())
    };
  },

  componentDidMount: function() {
    this.getFlux().actions.loadBuzz();
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
