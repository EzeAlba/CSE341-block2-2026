const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require('./data/database.js');

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is initialized and node listening on port ${port}`);
        });
    }
});

