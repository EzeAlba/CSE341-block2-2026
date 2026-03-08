const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require('./data/database.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

// Middleware to parse JSON request bodies
app.use(express.json());

// Swagger UI endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is initialized and node listening on port ${port}`);
            console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
        });
    }
});

