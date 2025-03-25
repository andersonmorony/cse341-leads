const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "CSE-341 Leads API",
        description: "API for CSE341 Leads",
    },
    host: "https://cse341-leads.onrender.com",
    schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
});