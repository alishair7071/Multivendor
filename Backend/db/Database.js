const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://alishair7071:FlutterNodeReact@ac-jh6zjts-shard-00-00.oqi8n7w.mongodb.net:27017,ac-jh6zjts-shard-00-01.oqi8n7w.mongodb.net:27017,ac-jh6zjts-shard-00-02.oqi8n7w.mongodb.net:27017/multivendor_db?ssl=true&replicaSet=atlas-sackt4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=SocialMedia-cluster",
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
