const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares')
const obtenerPerfilUsuario = middlewares.obtenerPerfilUsuario;
const obtenerUsuarios = middlewares.obtenerUsuarios;
const agregarUsuario = middlewares.agregarUsuario;
const borrarUsuario = middlewares.borrarUsuario;
const buscarUsuarioPorNombre = middlewares.buscarUsuarioPorNombre;
const modificarUsuario = middlewares.modificarUsuario

router.get('/usuarios', obtenerPerfilUsuario, async (req, res) => {
    admin = res.admin;
    if(admin != 1){
        res.status(403).send({admin})
    }else{
        res.status(200).send(await obtenerUsuarios());
    }
});

router.post('/usuarios', agregarUsuario, async (req, res) =>{
    res.status(201).send({Ok:`El usuario '${res.nuevoUsuario}' ha sido ingresado.`});
})

router.put('/usuarios', modificarUsuario, async (req, res) =>{
    id = res.id
    res.status(201).send({Ok:`El usuario con el Id:'${id}' ha sido modificado.`});
})

router.get('/usuarios/:nombre', async (req, res) =>{
    const usuario = req.params.nombre;
    console.log(JSON.stringify(usuario))
    const datosUsuario = await buscarUsuarioPorNombre(usuario)
    res.status(200).send({datosUsuario});
})

router.delete('/usuarios', async (req, res) =>{
    const usuario = req.body;
    const idUsuario = await buscarUsuarioPorNombre(usuario.usuario)
    const eliminarUsuario = await borrarUsuario(idUsuario[0].id_usuarios);
    if(!eliminarUsuario){
        res.status(404).send({error: 'El usuario ingresado no existe.'});
    }else{
        console.log(`El usuario '${usuario.usuario}' ha sido eliminado.`)
        res.status(201).send({Ok:`El usuario '${usuario.usuario}' ha sido eliminado.`});
    }
})

module.exports = router;