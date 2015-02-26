var passport = require("koa-passport"),
    parse = require('co-body'),
    User = require("mongoose").model("User");

exports.signIn = function *() {
  var ctx = this;
  yield* passport.authenticate("local", function*(err, user, info) {
    if (err) {
      throw err;
    }
    if (user === false) {
      ctx.status = 401;
    } else {
      yield ctx.login(user);
      ctx.body = { user: user };
    }
  }).call(this);
};

exports.getCurrentUser = function *() {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
  }
  this.status = 200;
};

exports.signOut = function *() {
  this.logout();
  this.session = null;
  this.status = 204;
};

exports.createUser = function *() {
console.log("here I am");
  var body = yield parse(this);
console.log("there I am");
   console.log(JSON.stringify(body, null, '\t'));
  if (!body) {
    this.throw("The body is empty", 400);
  }

  if (!body.username) {
    this.throw("Missing username", 400);
  }
  if (!body.password) {
    this.throw("Missing password", 400);
  }


  try {
    var user = new User(body);
    user = yield user.save();
    yield this.login(user);
  } catch (err) {
    this.throw(err);
  }

  this.status = 200;
  this.body = { user: this.passport.user };
};
