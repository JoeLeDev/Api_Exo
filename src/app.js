const express = require("express");
const createProductRoutes = require("./modules/products/product.routes");
const createUserRoutes = require("./modules/users/user.route");
const createOrderRoutes = require("./modules/orders/orders.routes");
const createRatingRoutes = require("./modules/ratings/rating.routes");
const apiKeyRoutes = require("./modules/apikey/apikey.routes");
const apiKeyAuth = require("./core/middlewares/apiKeyAuth");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const appError = require("./core/errors/appError");

function createApp(pool) {
  const app = express();

  app.use(express.json());
  
  app.get("/", (req, res) => {
    res.status(200).json({ ok: true, message: "Connexion a l'API ✅" });
  });

  app.use("/api/apikey", apiKeyRoutes);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use("/api/products", apiKeyAuth, createProductRoutes(pool));
  app.use("/api/users", apiKeyAuth, createUserRoutes(pool));
  app.use("/api/orders", apiKeyAuth, createOrderRoutes(pool));
  app.use("/api/ratings", apiKeyAuth, createRatingRoutes(pool));


  app.use(appError);

  return app;
}

module.exports = createApp;