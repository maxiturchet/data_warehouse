const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const obtenerPerfilUsuario = middlewares.obtenerPerfilUsuario;
const traerCompanias = middlewares.traerCompanias;
const obtenerCiudadPorId = middlewares.obtenerCiudadPorId;
const traerCompaniasPorNombre = middlewares.traerCompaniasPorNombre;
const modificarCompania = middlewares.modificarCompania;
const borrarCompania = middlewares.borrarCompania;
const agregarCompania = middlewares.agregarCompania;

router.get('/companias/admin', obtenerPerfilUsuario, async (req, res) => {
    admin = res.admin;
    if(admin != 1){
        res.status(200).send({message: admin})
    }else{
        res.status(200).send({message: admin});
    }
})

router.get('/companias/ciudad/:id', async (req, res) =>{
    const id = req.params.id;
    res.status(200).send(await obtenerCiudadPorId(id))
})

router.get('/companias', async (req, res) =>{
    res.status(200).send(await traerCompanias())
})

router.get('/companias/:nombre', async (req, res) =>{
    const nombre = req.params.nombre;
    res.status(200).send(await traerCompaniasPorNombre(nombre))
})

router.post('/companias', agregarCompania, async (req, res) =>{
    nuevaCompania = res.nuevaCompania
    res.status(201).send({Ok:`La compañía '${nuevaCompania}' ha sido creada exitosamente.`});
})

router.delete('/companias', async (req, res) => {
    const compania = req.body;
    console.log(compania)
    const idCompania = await traerCompaniasPorNombre(compania.compania)
    const eliminarCompania = await borrarCompania(idCompania[0].id_compania);
    if(!eliminarCompania){
        res.status(404).send({error: 'El usuario ingresado no existe.'});
    }else{
        console.log(`El usuario '${compania.compania}' ha sido eliminado.`)
        res.status(201).send({Ok:`El usuario '${compania.compania}' ha sido eliminado.`});
    }
})

router.put('/companias', modificarCompania, async (req, res) =>{
    id = res.id
    res.status(200).send({Ok: `La compañía con ID:${id} ha sido modificada con éxito.`})
})


module.exports = router;
