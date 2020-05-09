const router = app => {
    app.get('/', (request, response) => {
        console.log('URL: ' + request.url);
        response.send({mensaje: 'Hola camarada'});
    })
}

module.exports = router;