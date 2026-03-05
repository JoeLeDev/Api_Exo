  const express = require("express");
  
  const createRepo = require("./user.repository");
  const createService = require("./user.service");
  const createController = require("./user.controller");
  
  const validateData = require("../../core/middlewares/validateData");
  const { userSchema } = require("./user.schema");
  
  module.exports = (pool) => {
  const router = express.Router();
  
  const repo = createRepo(pool);
  const service = createService(repo);
  const controller = createController(service);
  
  
  router.get("/", controller.getAllUsers);
  router.get("/:id", controller.getOneUser);

  router.post("/", validateData(userSchema), controller.createUser);
  router.put("/:id", validateData(userSchema), controller.updateUser);

  router.delete("/:id", controller.removeUser);

  return router;

  }