const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const productsRouter = require("./routes/productsRouter");
const salesRouter = require("./routes/salesRouter");
const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(express.json());

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/products", productsRouter);

app.use("/sales", salesRouter);

app.use(errorMiddleware);

module.exports = app;
