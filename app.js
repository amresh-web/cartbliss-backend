const express = require("express");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

require("./config/db");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`My server is running at port ${PORT}`);
});
