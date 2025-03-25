const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const router = require("./routes");


// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

// Errpr handling
const errorHandle = require("./services/errorHandle");

const passport = require("passport");
const session = require("express-session");
const app = express();


require("./services/passport");

app.use(
    session({
      secret: process.env.SESSON_SECRET,
      resave: false,
      saveUninitialized: false
    })
);


app.use(passport.initialize());
app.use(passport.session());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorHandle);

mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
});
