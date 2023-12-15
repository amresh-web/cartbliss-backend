const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const product_routes = require("./routes/product");

const connectDB = require("./db/connect");

app.get("/", (req, res) => {
  res.send("Hi, I am Live!");
});

app.use("/api/product", product_routes);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`${PORT} I am connected`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
