const express = require('express');
const app = express();

app.get('/', async (req, res, next) => {
    try {
        throw new Error('Something went wrong!');
    } catch (err) {
        next(err);
    }
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});