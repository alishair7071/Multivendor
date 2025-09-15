const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb://alishair7071:FlutterNodeReact@ac-jh6zjts-shard-00-00.oqi8n7w.mongodb.net:27017,ac-jh6zjts-shard-00-01.oqi8n7w.mongodb.net:27017,ac-jh6zjts-shard-00-02.oqi8n7w.mongodb.net:27017/?ssl=true&replicaSet=atlas-sackt4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=SocialMedia-cluster");
    console.log("connected with mongodb successfully+++");
      // added this by default data when server was run first time 
      // now this data is stored on mongodb for testing and other purpose
      // and now i am commenting it to avoid from adding frequently when server will run;
      /*userModel.insertMany(users);
      postModel.insertMany(posts);*/
  } catch (e) {
    console.log("cannot connect with mongodb: "+e);
  }
};

module.exports = connectDatabase;

 