const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: ` ${ '1.'.green } Buscar ciudad`
            },
            {
                value: 2,
                name: ` ${ '2.'.green } Historial`
            },
            {
                value: 0,
                name: ` ${ '0.'.green } Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {

    console.clear()
    console.log('================================'.rainbow);
    console.log('      Selecciona una opcion     '.rainbow);
    console.log('================================\n'.rainbow);

    const { opcion } = await inquirer.prompt(preguntas)

    return opcion;
}

const pausa = async () => {

    const question = [{
        type: 'input',
        name: 'continuar',
        message:`\nPresione ${ 'ENTER'.green } para continuar`
    }]

    await inquirer.prompt(question)
}

const leerInput = async ( message ) => {

    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate( value ) {
                if( value.lenght === 0 ) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    const { descripcion } = await inquirer.prompt(question);
    return descripcion;
}

const listarLugares = async ( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => {

        const idx = `${ i + 1 }.`.green

        return {
            value: lugar.id,
            name: `${ idx }. ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
 
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const mostrarListadoChecklist = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${ i + 1 }.`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
 
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones: ',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}