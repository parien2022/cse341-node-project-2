const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Broker API',
        description: 'Broker API'
    },
    host: 'localhost:8081',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/routes'];

swaggerAutoGen(outputFile, endpointsFiles, doc);