const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://alishair7071:O6Mqg3Vutby5DBib@cluster0.uxswtqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
      }
    )
    .then((data) => {
      console.log(`mongodb is connnected with server ++`);
    })
    .catch((err) => {
      console.log("does not connected with mongodb due to: " + err.message);
    });
};

module.exports = connectDatabase;
