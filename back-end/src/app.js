const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const testRouter = require('./routes/test');
const collaboratorRouter = require('./routes/collaborator');
const clientRoutes = require('./routes/client');


const port = process.env.PORT || 3001;
app.use(cors());

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/business', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');

        // Inicia el servidor después de que la base de datos esté conectada
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database', err);
    }
}

// Conecta a la base de datos y arranca el servidor
connectToDatabase();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', testRouter);
app.use('/api', collaboratorRouter);
app.use('/api', clientRoutes);


module.exports = app;