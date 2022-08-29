const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.3" });

const doc = {
  info: {
    title: "Store Manager API",
    description:
      "Sale management CRUD API to create, visualize, delete and update products from database",
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
