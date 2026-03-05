const express = require("express");

const createRepo = require("./product.repository");
const createService = require("./product.service");
const createController = require("./product.controller");

const validateData = require("../../core/middlewares/validateData");
const { productSchema } = require("./product.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);

  router.post("/", validateData(productSchema), controller.create);
  router.put("/:id", validateData(productSchema), controller.update);

  router.delete("/:id", controller.remove);
  



  return router;
};