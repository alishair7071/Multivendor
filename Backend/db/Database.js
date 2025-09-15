const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://alishair3420_db_user:FtrVf6RqBoxIVh6z@multivendor-cluster.lbkslhr.mongodb.net/?retryWrites=true&w=majority&appName=multivendor-cluster");
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

 