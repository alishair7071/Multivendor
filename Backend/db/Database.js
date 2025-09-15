const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://alishair3420_db_user:FtrVf6RqBoxIVh6z@multivendor-cluster.lbkslhr.mongodb.net/?retryWrites=true&w=majority&appName=multivendor-cluster");
    
    console.log("connected with mongodb successfully+++");
  } catch (e) {
    console.log("cannot connect with mongodb: "+e);
    process.exit(1);
  }
};

module.exports = connectDatabase;

 