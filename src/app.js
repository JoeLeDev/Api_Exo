const express = require("express");
const createProductRoutes = require("./modules/products/product.routes");
const createUserRoutes = require("./modules/users/user.route")
const appError = require("./core/errors/appError")

function createApp(pool) {
  const app = express();

  app.use(express.json());
  

  app.get("/", (req, res) => {
    res.status(200).json({ ok: true, message: "Connexion a l'API ✅" });
  });

  app.use("/api/products", createProductRoutes(pool));
  app.use("/api/users", createUserRoutes(pool));

  app.use(appError)

  return app;
}

module.exports = createApp;