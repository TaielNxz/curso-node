const http = require('http');


http.createServer( ( req, res ) => {

    // res.setHeader( 'Content-Disposition', 'attachment; filename=lista.csv' );
    // res.writeHead(200, { 'Content-Type': 'aplication/csv' })


    res.write( 'Hola Mundo' );
    res.end();

})
.listen( 8080 );

console.log('Escuchando en el puerto', 8080 );

