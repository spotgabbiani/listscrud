/**
 * Required External Modules
 */
const express = require("express");
const mongoose = require('mongoose');
const routes = require("./routes");
const bodyParser = require("body-parser")
const port = process.env.PORT || "8000";


/**
 * Server Activation
 */

mongoose.connect('mongodb://localhost:27017/favorite-stuff',  { useNewUrlParser: true })
.then(() => {
    console.log("La conexión a la base de datos se ha realizado correctamente")
    const app = express();
    app.use(bodyParser.json());
    app.use("/api", routes)
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
      });
})
.catch(err => console.log(err));