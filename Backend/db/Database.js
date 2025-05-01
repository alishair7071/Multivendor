const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true
    })
    .then((data) => {
      console.log(`mongodb is connnected with server`);
    })
    .catch((err) => {
      console.log("does not connected with mongodb due to: " + err.message);
    });
};

module.exports = connectDatabase;
