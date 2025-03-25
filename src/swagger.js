const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "CSE-341 Leads API",
        description: "API for CSE341 Leads",
    },
    host: "localhost:3300",
    schemes: ['http', 'https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
});