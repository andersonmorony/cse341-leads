const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const router = require("./routes");

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');

// Errpr handling
const errorHandle = require("./services/errorHandle");

const app = express();

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
