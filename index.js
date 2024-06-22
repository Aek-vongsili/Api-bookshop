const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");
const bookRouter = require("./routers/books");
const register_Login = require("./routers/login");
const createOrder = require("./routers/orderPayment");
require("./auth/passport");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const corOptions = {
  origin: "*",
};
app.use(cors(corOptions));
app.use("/api/books", bookRouter);
app.use("/api/user", register_Login);
app.use("/api/orders", createOrder);

app.listen(port, () => {
  console.log(`Your server is listen on ${port}`);
});
