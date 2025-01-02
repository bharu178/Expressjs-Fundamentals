const express = require('express');
const path = require('path');
const app = express();
// Set the view engine to ejs(embedded javascript) and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/render', (req, res) => {
    // Render the 'index' view with a title variable
    res.render('index', { title: 'Express Render Example' });
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
