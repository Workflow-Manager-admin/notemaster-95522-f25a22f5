const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes Backend API',
      version: '1.0.0',
      description: 'REST API for managing notes in the Notes Application',
    },
    components: {
      schemas: {
        Note: {
          type: 'object',
          required: ['title', 'content', 'user_id'],
          properties: {
            id: {
              type: 'integer',
              readOnly: true,
              description: 'Unique identifier for the note'
            },
            title: {
              type: 'string',
              minLength: 1,
              maxLength: 200,
              description: 'Title of the note'
            },
            content: {
              type: 'string',
              minLength: 1,
              description: 'Content of the note'
            },
            user_id: {
              type: 'integer',
              minimum: 1,
              description: 'ID of the user who owns the note'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              readOnly: true,
              description: 'Timestamp when the note was created'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              readOnly: true,
              description: 'Timestamp when the note was last updated'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string'
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success'
            },
            data: {
              oneOf: [
                { $ref: '#/components/schemas/Note' },
                {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Note' }
                }
              ]
            }
          }
        }
      },
      responses: {
        ValidationError: {
          description: 'Validation Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                message: 'Validation failed',
                errors: ['Title must be between 1 and 200 characters']
              }
            }
          }
        },
        NotFoundError: {
          description: 'Resource Not Found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                message: 'Note not found'
              }
            }
          }
        },
        ServerError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                message: 'Internal server error'
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Notes',
        description: 'API endpoints for managing notes'
      }
    ],
    security: []
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
