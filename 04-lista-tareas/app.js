require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo.js');
const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer.js');
const Tareas = require('./models/tareas.js');

const main = async () => {

    let option = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) {
        // Establecer tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // Imprimir el menu 
        option = await inquirerMenu();

        switch (option) {
            // 1. Crear Tarea
            case '1':
                // Ingresa tarea y agrega al listado
                const descripcion = await leerInput('Descripción: ');
                tareas.crearTarea( descripcion );
                break;

            // 2. Listar tareas
            case '2':
                tareas.listadoCompleto( tareas.listadoArr );
                break;

            // 3. Listar tareas completadas
            case '3':
                tareas.listarPendientesCompletadas( true );
                break;

            // 4. Listar tareas pendientes
            case '4':
                tareas.listarPendientesCompletadas( false );
                break;

            // 5. Completar tarea(s)
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
                
            // 6. Borrar tarea
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if( id !== '0' ) {
                    const ok = await confirmar('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
                break;
        }
        
        // guardarDB( tareas.listadoArr );

        await pausa();

    } while ( option !== '0' );

}

main();