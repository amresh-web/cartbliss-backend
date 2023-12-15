const mongoose = require("mongoose");

uri =
  "mongodb+srv://amreshweb:tMnmrcAIzCfEtcfC@cartblissapi.0syhdxx.mongodb.net/cartblissAPI?retryWrites=true&w=majority";

const connectDB = () => {
  console.log("Connecting to DB");
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
