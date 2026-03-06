const express = require("express");

const createRepo = require("./orders.repository");
const createService = require("./orders.service");
const createController = require("./orders.controller");

const validateData = require("../../core/middlewares/validateData");
const { orderSchema } = require("./orders.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);

  router.post("/", validateData(orderSchema), controller.create);
  router.put("/:id", validateData(orderSchema), controller.update);

  router.delete("/:id", controller.remove);
  



  return router;
};