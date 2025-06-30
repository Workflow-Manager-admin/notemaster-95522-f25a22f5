const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes Backend API',
      version: '1.0.0',
      description: 'REST API for managing notes in the Notes Application',
    },
    tags: [
      {
        name: 'Notes',
        description: 'API endpoints for managing notes'
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
