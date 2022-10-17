const express = require("express");
const cors = require("cors");

const operationsRouter = require("./routes/operations");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/operations", operationsRouter);
app.use("/categories", categoriesRouter);

app.listen(8000);
