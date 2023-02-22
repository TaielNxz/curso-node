const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    // const { q , nombre = 'no name', apikey, page = 1, limit } = req.query;
    const { limite = 5 , desde = 0 } = req.query;
    const query = { estado: true }

    const [ total , usuarios ] = await Promise.all([ 
        Usuario.countDocuments(),
        Usuario.find(query)
            .skip(  Number( desde )  )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
    })
}


const usuariosPost = async (req = request, res = response) => {

    // Crear un usuario
    const { nombre, correo, password, rol, google } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol, google });
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar la BD
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    })
}


const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra bse de datos
    if( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id , resto );
    
    res.json(usuario)
}


const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
    })
}


const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}