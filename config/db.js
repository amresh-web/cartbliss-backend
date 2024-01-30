const mongoose = require("mongoose");

const mongo_url = process.env.DATABASE_URL;
console.log("db", mongo_url);
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.once("connected", (res) => {
  console.log("connected");
});
