const swaggerAutogen = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'A simple REST API for managing contacts'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
            {
                url: 'https://cse341-project1-9dnd.onrender.com',
                description: 'Production server'
            }
        ],
        components: {
            schemas: {
                Contact: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Unique identifier for the contact'
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name of the contact'
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name of the contact'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email address of the contact'
                        },
                        favoriteColor: {
                            type: 'string',
                            description: 'Favorite color of the contact'
                        },
                        birthday: {
                            type: 'string',
                            description: 'Birthday of the contact (MM/DD/YYYY)'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerAutogen(options);
module.exports = swaggerSpec;
