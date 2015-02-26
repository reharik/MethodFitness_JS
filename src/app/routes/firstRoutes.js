var router = require("koa-router");

var clientController = require("../controllers/client.server.controller");
var indexController = require("../controllers/index.server.controller");
var authController = require("../controllers/auth.server.controller");

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function (app, passport) {
  // register functions
  app.use(router(app));

  app.get("/", function *() {
    yield indexController.index.apply(this);
  });

  app.get("/auth", authController.getCurrentUser);
  app.post("/auth", authController.signIn);

  app.all("/signout", authController.signOut);
  app.post("/signup", authController.createUser);

  // secured routes
  app.post("/client/create", secured, clientController.create);



  //app.get("/value", secured, countController.getCount);
  //app.get("/inc", secured, countController.increment);
  //app.get("/dec", secured, countController.decrement);
};
