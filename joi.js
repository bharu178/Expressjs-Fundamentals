const express = require('express');
const Joi = require('joi'); // Import Joi for validation

const app = express();
app.use(express.json()); // Middleware to parse JSON

// POST Route
app.post('/submit', (req, res) => {
    // Define Joi schema for validation
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().integer().positive().required(),
        email: Joi.string().email().required(),
    });

    // Validate the request body against the schema
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        // If validation fails, respond with error details
        return res.status(400).json({
            success: false,
            message: 'Validation errors occurred',
            errors: error.details ? error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
            })) : [],
        });
    }

    // If validation passes
    res.send('All details are correct');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
