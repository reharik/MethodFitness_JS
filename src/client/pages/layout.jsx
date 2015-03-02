var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Jumbotron = require("react-bootstrap").Jumbotron;
var Nav = require("react-bootstrap").Nav;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var DropdownButton = require("react-bootstrap").DropdownButton;

var ReactRouterBootstrap = require('react-router-bootstrap');
var ButtonLink = ReactRouterBootstrap.ButtonLink;

var AuthStore = require("../stores/auth");

var Layout = React.createClass({
  render: function() {
    if (!AuthStore.isLoggedIn()) {
      return (
        <Jumbotron>
          <div className="container">
            <RouteHandler />
          </div>
        </Jumbotron>
      );
    }
    return (
      <div className="container">
        <Row>
          <Col md={2}>
            <Nav bsStyle="pills" stacked>
              <DropdownButton className="btn btn-default" title="Clients" stacked>
                <Nav bsStyle="pills" stacked>
                  <ButtonLink to="client-list">List Clients</ButtonLink>
                  <ButtonLink to="add-client">Add Client</ButtonLink>
                </Nav>
              </DropdownButton>
            </Nav>
          </Col>
          <Col md={10} className="well">
            <RouteHandler />
          </Col>
        </Row>
      </div>
    );
  }
});

module.exports = Layout;
