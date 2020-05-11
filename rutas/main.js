const db = require('../database/config');
require('dotenv').config();

const router = app => {
    app.get(`${process.env.API_URL}/cmd`, (request, response) => {
        const sendData = function(data) {
            response.send(data);
        }
        const getRespuestas = function(query, array) {
            let faltan = array.length;
            array.forEach((cmd, i) => {
                db.query(query, cmd.id, function(error, res) {
                    cmd.respuestas = [];
                    res.forEach(resp => cmd.respuestas.push(resp.respuesta));
                    if (0 === --faltan) sendData(array);
                });
            });
        }
        db.query('SELECT * FROM comando', (error, comandos) => {
            if (error) throw error;
            let faltan = comandos.length;
            let queryTags = 'SELECT T.nombre FROM tag AS T INNER JOIN rel_comando_tag AS RCT ON T.id = RCT.id_tag WHERE RCT.id_comando = ?';
            let queryRespuestas = 'SELECT * FROM respuesta AS R INNER JOIN rel_comando_respuesta AS RCR ON R.id = RCR.id_respuesta WHERE RCR.id_comando = ?';
            comandos.forEach((cmd, i) => {
                db.query(queryTags, cmd.id, function(errorT, tags) {
                    cmd.tags = [];
                    tags.forEach(tag => cmd.tags.push(tag.nombre));
                    if (0 === --faltan) getRespuestas(queryRespuestas, comandos);
                });
            });
        })
    })
}

module.exports = router;