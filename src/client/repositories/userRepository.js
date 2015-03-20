var request = require("superagent");


var URLS = {
  AUTH: "/auth",
  SIGN_UP: "/signup",
  SIGN_OUT: "/signout"
};

module.exports = {

  FetchUser: function (success, error) {
    request.get(URLS.AUTH)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .end(function (err, res) {
        if (!err && res.body && res.body.user) {
          _user = parseUser(res.body.user);
          success(_user);
        }else{
          success();
        }
      });
  },

  SignOut: function (success, error) {
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

  SignIn:function(data, success, error){
    _postAndHandleParseUser(URLS.AUTH, data, success, error);
  }

};

function _postAndHandleParseUser (url, data, success, error) {
  request.post(url)
    .set("Accept", "application/json")
    .set("Content-Type", "application/json")
    .send({ username: data.username, password: data.password })
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
