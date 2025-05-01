const app= require("./app.js");
const connectDatabase = require("./db/Database.js");

//handling uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception');
});

//config 
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({path:'config/.env'});
}


connectDatabase();

//create server
const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on the port: ${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err)=>{
    console.log("shutting down the server due to error: "+err.message);
    console.log("shutting down the server due to unhandledRejections");

    server.close(()=>{
        process.exit(1);
    })
});

