const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

//criando servidor
const app = express();

//Conectando ao BD
conectarDB();
app.use(cors());

app.use(express.json());

app.use('/api/produtos', require('./routes/produto'));

app.listen(4000, () => {
    console.log('O servidor está correndo perfeitamente!')
})