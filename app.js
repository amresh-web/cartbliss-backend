const express = require("express");
var cors = require("cors");

require("dotenv").config();

require("./config/db");

const routes = require("./routes/routes");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`My server is running at port ${PORT}`);
});
