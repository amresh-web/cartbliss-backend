
const express = require("express");

require("dotenv").config();

require('./config/db');

const apiRoutes = require('./routes/api.routes');
const app = express();
app.use(express.json);

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`My server is running at port ${PORT}`);
});

