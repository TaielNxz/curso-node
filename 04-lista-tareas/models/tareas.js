const Tarea = require('./tarea')
/**
 * _listado:
 *  { 'uuid-12345-12345': { id:12, desc:asd, completadoEn: 92231 } }
 */

class Tareas {

    _listado = {
        'abc': 123
    };

    get listadoArr() {
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; 
    }

    listadoCompleto( tareas = [] ) {

        tareas.forEach( ( tarea , i ) => {
            // Extraer informacion
            const indice = `${ i+1 }.`.green
            const { descripcion , completadoEn } = tarea
            const estado = ( completadoEn ) 
                                ? 'Completado'.green 
                                : 'Pendiete'.red
            // Mostrar en consola
            console.log( `${ indice } ${ descripcion } :: ${ estado }`);
        })
    }

    listarPendientesCompletadas( completadas = true ) {

        let contador = 0;
        this.listadoArr.forEach( tarea => {

            const { descripcion, completadoEn } = tarea;

            if( completadas ) {
                if( completadoEn ) {
                    contador++;
                    console.log(`${ (contador + '.').green } ${ descripcion } :: ${ completadoEn.green }`);
                }
            } else {
                // mostrar pendientes
                if( !completadoEn ) {
                    contador++;
                    console.log(`${ (contador + '.').green } ${ descripcion } :: ${ 'pendiente'.red }`);
                }
            }
        })

    }

    toggleCompletadas ( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }
}

module.exports = Tareas;