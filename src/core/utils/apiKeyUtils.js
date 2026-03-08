const crypto = require("crypto");

const apiKeysDB = new Map();

const createApiKey = (clientName) => {

  const randomBuffer = crypto.randomBytes(32);

  const plainAPIKey = `lc_live_${randomBuffer.toString("hex")}`;

  const hashedApiKey = crypto
    .createHash("sha256")
    .update(plainAPIKey)
    .digest("hex");

  apiKeysDB.set(hashedApiKey, {
    client: clientName,
    createdAt: new Date().toISOString()
  });

  return plainAPIKey;
};

const checkClientApiKey = (APIkey) => {

  const hashedApiKey = crypto
    .createHash("sha256")
    .update(APIkey)
    .digest("hex");

  return apiKeysDB.get(hashedApiKey);
};

module.exports = {
  createApiKey,
  checkClientApiKey
};