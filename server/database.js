const mongoose = require("mongoose");

function databaseConnection() {
  const databaseURL = process.env.DATABASE_URL;
  // Database connection
  mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DataBase connected...");
  });
}

module.exports = databaseConnection;
