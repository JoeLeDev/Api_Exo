const { checkClientApiKey } = require("../utils/apiKeyUtils");

const apiKeyAuth = (req, res, next) => {

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      error: "API key manquante"
    });
  }

  const client = checkClientApiKey(apiKey);

  if (!client) {
    return res.status(403).json({
      error: "API key invalide"
    });
  }

  req.client = client;

  next();
};

module.exports = apiKeyAuth;