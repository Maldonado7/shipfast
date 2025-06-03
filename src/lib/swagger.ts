import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js Full-Stack API',
      version: '1.0.0',
      description: 'A comprehensive API for the Next.js Full-Stack Template',
      contact: {
        name: 'API Support',
        email: 'support@yourdomain.com',
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            name: {
              type: 'string',
              description: 'User display name',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
          },
        },
        Todo: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Todo ID',
            },
            title: {
              type: 'string',
              description: 'Todo title',
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Todo description',
            },
            completed: {
              type: 'boolean',
              description: 'Completion status',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Todo priority level',
            },
            dueDate: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Due date',
            },
            userId: {
              type: 'integer',
              description: 'Owner user ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
            message: {
              type: 'string',
              description: 'Detailed error description',
            },
          },
        },
        HealthCheck: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['healthy', 'unhealthy'],
              description: 'System health status',
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Check timestamp',
            },
            services: {
              type: 'object',
              properties: {
                database: {
                  type: 'string',
                  enum: ['connected', 'disconnected'],
                },
                server: {
                  type: 'string',
                  enum: ['running', 'stopped'],
                },
              },
            },
          },
        },
      },
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'session',
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts'], // Path to the API files
}

export const swaggerSpec = swaggerJSDoc(options)