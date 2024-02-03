const swaggerAutoGen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Broker API',
    description: 'Broker API',
  },
  host: 'broker-api-mum6.onrender.com',
  schemes: ['https', 'http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutoGen(outputFile, endpointsFiles, doc)
