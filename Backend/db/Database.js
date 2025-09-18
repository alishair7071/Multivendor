const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    
    console.log("connected with mongodb successfully+++");
  } catch (e) {
    console.log("cannot connect with mongodb: "+e);
    process.exit(1);
  }
};

module.exports = connectDatabase;

 