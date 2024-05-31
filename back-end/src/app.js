const express = require('express');
const mongoose = require('mongoose');


const app = express();

const port = 3000 || process.env.PORT;

mongoose.connect('mongodb://127.0.0.1:27017/business', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });