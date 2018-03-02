var mongoose = require("mongoose");
console.log('Be sure to put in your connection string!')
var connectionString = "mongodb://music:test@ds153198.mlab.com:53198/vue-music";

var connection = mongoose.connection;
mongoose.connect(connectionString);

connection.on("error", err => {
  console.error("mlab Error: ", err);
});

connection.once("open", () => {
  console.log("connected to database");
});