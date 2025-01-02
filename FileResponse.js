const express = require('express');
const path = require('path');
const app = express();
app.get('/file', (req, res) => {
    // Set the path to the file
    const filePath = path.join(__dirname, 'example.pdf');

    // Send the file at the specified path
    res.sendFile(filePath, function(err) {
        if (err) {
            console.log('Error sending file:', err);
            res.status(500).send('Error sending file');
        } else {
            console.log('File sent successfully');
        }
    });
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
