const { crearArchivo } = require('./helpers/multiplicar.js');
const argv = require('./config/yargs.js');
var colors = require('colors');


console.clear();


crearArchivo( argv.b , argv.h , argv.l )
    .then( nombreArchivo => console.log( colors.rainbow(`${nombreArchivo} creado`) ))
    .catch( err => console.log(err) );
