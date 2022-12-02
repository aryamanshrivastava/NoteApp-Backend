const express = require('express');
const serverless = require('serverless-http');
const app = express();

const mongoose = require('mongoose');
const Note = require('./models/Note');
const router = require('./routes/Note');

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use('/.netlify/functions/api',router);
const mongoDbPath = "mongodb+srv://aryaman:aryaman@cluster0.ojnrfla.mongodb.net/notesdb";
mongoose.connect(mongoDbPath).then(function()
{
    app.get("/",function(req,res){
        const response = {statuscode:res.statusCode,  message: "API Works!"};
        res.json(response);
    });

    const noteRouter = require('./routes/Note');
    app.use("/notes",noteRouter);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT,function(){
    console.log("Server started at PORT:" + PORT);
});
module.exports = app;
module.exports.handler = serverless(app)
// // "start": "node src/server.js",//package.json scripts
// "test": "echo \"Error: no test specified\" && exit 1",
//     "dev": "nodemon src/server.js",