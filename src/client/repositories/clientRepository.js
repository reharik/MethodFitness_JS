/*jslint node: true */
"use strict";
var request = require("superagent");
var requestPromise = require("./../services/promiseSuperAgent");

var URLS = {
  CLIENTS: "/clients"
};


module.exports = {
  loadClientSummaries: function () {
    return requestPromise( request.get(URLS.CLIENTS)
        .set("Accept", "application/json")
    );
  }
};
