var request = require("superagent");


var URLS = {
  AUTH: "/auth",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout"
};

module.exports = {

  fetchUser: function (success, error) {
    request.get(URLS.AUTH)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        if (!err && res.body && res.body.user) {
          _user = parseUser(res.body.user);
          success(_user);
        }else{
          error(err);
        }
      });
  },

  signOut: function (success, error) {
    request.get(URLS.SIGN_OUT)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        if (!err) {
          success();
        }else{
          error(err);
        }
      });
  },

  signIn:function(data, success, error){
    _postAndHandleParseUser(URLS.SIGN_IN, data, success, error);
  }

};

function _postAndHandleParseUser (url, data, success, error) {
  request.post(url)
    .set("Accept", "application/json")
    .set("Content-Type", "application/json")
    .send({ username: username, password: password })
    .end(function (err, res) {
      if (!err && res.body && res.body.user) {
        _user = parseUser(res.body.user);
        success(user);
      }else{
        error(err);
      }
    });
};

function parseUser (user) {
  return {
    id: user.id,
    username: user.username
  };
}
