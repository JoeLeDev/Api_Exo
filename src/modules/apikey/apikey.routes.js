const express = require("express");
const router = express.Router();

const { createApiKey } = require("../../core/utils/apiKeyUtils");

router.post("/create", (req, res) => {

  const { clientName } = req.body;

  if (!clientName) {
    return res.status(400).json({
      error: "clientName requis"
    });
  }

  const apiKey = createApiKey(clientName);

  res.status(201).json({
    apiKey
  });
});

module.exports = router;