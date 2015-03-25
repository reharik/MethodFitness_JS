var React = require("react");
var Router = require("react-router");

var NotFound = React.createClass({
  displayName: "NotFoundPage",
  contextTypes: { router: React.PropTypes.func.isRequired },

  render: function () {
    return (
      <div>
        <h1>404 <small>| Page Not Found</small></h1>
        <p>Sorry the following path</p>
        <pre>{ this.context.router.getCurrentPath()}</pre>
        <p>does not exist on this site</p>
        <p>Are you sure you have the right url?</p>
      </div>
    );
  }
});

module.exports = NotFound;
