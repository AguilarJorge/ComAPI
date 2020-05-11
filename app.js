const express = require('express');
const bodyParser = require('body-parser');
const rutas = require('./rutas/main');
const puerto = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const server = app.listen(puerto, (error) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Server jalando en el puerto: ${server.address().port}`);
})

rutas(app);