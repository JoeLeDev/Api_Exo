const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API CiveLampus",
      version: "1.0.0",
      description: "Documentation de l'API du TP",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["./src/modules/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;