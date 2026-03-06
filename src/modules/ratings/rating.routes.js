const express = require("express");

const createRepo = require("./rating.repository");
const createService = require("./rating.service");
const createController = require("./rating.controller");

const validateData = require("../../core/middlewares/validateData");
const { ratingSchema } = require("./rating.schema");

module.exports = (pool) => {
  const router = express.Router();

  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getOne);

  router.post("/", validateData(ratingSchema), controller.create);
  router.put("/:id", validateData(ratingSchema), controller.update);

  router.delete("/:id", controller.remove);
  
  return router;
};