
const express = require("express");

require("dotenv").config();

require('./config/db');

const app = express();
app.use(express.json);

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
  console.log(`My server is running at port ${PORT}`);
});

