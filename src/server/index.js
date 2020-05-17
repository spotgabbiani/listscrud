/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require('mongoose');
const routes = require("./routes");
const bodyParser = require("body-parser")
const port = process.env.PORT || "8000";
const cors = require("cors");
const cookieParser = require('cookie-parser');

/**
 * Server Activation
 */
const app = express();
mongoose.connect('mongodb://localhost:27017/favorite-stuff',  { useNewUrlParser: true })
.then(() => {
    app.use(cors());
    app.use(cookieParser());
    app.all("*", (req,res, next) => {
      const { auth } = req.cookies;
      if(auth){
        console.log("auth cookie was found");
        next(); 
      }else{
        console.log("auth cookie was not found");
        next();
       }
     })
    app.use(bodyParser.json());
    app.use("/api", routes)
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
      });
})
.catch(err => console.log(err));

module.exports = app;