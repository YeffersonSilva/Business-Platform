const express = require('express');
const mongoose = require('mongoose');


const app = express();

const port = 3000 || process.env.PORT;

mongoose.connect('mongodb://127.0.0.1:27017/business', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });