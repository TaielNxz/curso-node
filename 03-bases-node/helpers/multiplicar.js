const fs = require('fs');
var colors = require('colors');

const crearArchivo = async ( base , hasta = 10 , listar = false ) => {

    try {
        
        let salida = '';
        let consola = '';
        
    
        for (let i = 1; i <= hasta; i++) {
            salida +=  `${base} x ${i} = ${ base*i }\n`;
            consola += `${base} x ${i} = ${colors.green( base*i )}\n`;
        }
    
        if( listar ) {
            console.log(colors.rainbow('================'));
            console.log(colors.rainbow(`  Tabla del: ${base}`));
            console.log(colors.rainbow('================'));
            console.log(consola);
        }
    
        fs.writeFileSync( `./salida/tabla-${base}.txt`, salida );
    
        return `tabla-${base}.txt`

    } catch (err) {
        throw err
    }

}

module.exports = {
    crearArchivo
};