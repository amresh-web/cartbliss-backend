const mongoose = require("mongoose");

const mongo_url = process.env.DATABASE_URL;
console.log('db', mongo_url)
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', err => {
  console.log(err);
})

mongoose.connection.on('connected', res => {
  console.log('connected');
})