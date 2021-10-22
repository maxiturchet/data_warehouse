const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const { route } = require('./usuarios');
const obtenerRegionPaises = middlewares.obtenerRegionPaises;
const borrarRegion = middlewares.borrarRegion;
const editarCiudad = middlewares.editarCiudad;
const editarPais = middlewares.editarPais;
const obtenerPerfilUsuario = middlewares.obtenerPerfilUsuario;
const buscarDatosRegion = middlewares.buscarDatosRegion;
const agregarRegion = middlewares.agregarRegion
const agregarPais = middlewares.agregarPais 
const agregarCiudad = middlewares.agregarCiudad 
const obtenerRegiones = middlewares.obtenerRegiones 
const obtenerPaises = middlewares.obtenerPaises 
const obtenerCiudades = middlewares.obtenerCiudades 
const buscarHijosRegion = middlewares.buscarHijosRegion 
const convertirNombreRegionAId = middlewares.convertirNombreRegionAId 
const convertirNombrePaisAId = middlewares.convertirNombrePaisAId 

router.get('/region/admin', obtenerPerfilUsuario, async (req, res) => {
    admin = res.admin;
    if(admin != 1){
        res.status(200).send({message: admin})
    }else{
        res.status(200).send({message: admin});
    }
})

router.get('/region', async (req, res) => {
    res.status(200).send(await obtenerRegionPaises())
})

router.get('/region/:nombre', async (req, res) => {
    const nombre = req.params.nombre
    res.status(200).send(await convertirNombreRegionAId(nombre))
})
router.get('/pais/:nombre', async (req, res) => {
    const nombre = req.params.nombre
    res.status(200).send(await convertirNombrePaisAId(nombre))
})

router.get('/regiones', async (req, res) =>{
    res.status(200).send(await obtenerRegiones())
})
router.get('/region/paises', async (req, res) =>{
    res.status(200).send(await obtenerPaises())
})
router.get('/region/ciudades', async (req, res) =>{
    res.status(200).send(await obtenerCiudades())
})

router.get('/region/paises/:registro', async (req, res) => {
    const lugar = req.params.registro;
    console.log(lugar)
    const regiones = 'paises';
    res.status(200).send(await buscarDatosRegion(regiones, lugar))
})

router.get('/region/ciudades/:registro', async (req, res) => {
    const lugar = req.params.registro;
    const regiones = 'ciudades';
    res.status(200).send(await buscarDatosRegion(regiones, lugar))
})

router.get('/region/paisesPorRegion/:dato', async (req, res) => {
    const id_lugar = req.params.dato;
    const regionPadre = 'region'
    const regiones = 'paises';
    res.status(200).send(await buscarHijosRegion(regiones, regionPadre, id_lugar))
})

router.get('/region/ciudadesPorPais/:dato', async (req, res) => {
    const id_lugar = req.params.dato;
    const regionPadre = 'pais'
    const regiones = 'ciudades';
    res.status(200).send(await buscarHijosRegion(regiones, regionPadre, id_lugar))
})

router.post('/region', agregarRegion, async (req, res) => {
    region = res.region
    res.status(200).send({message: `La región ${region} ha sido agregada exitosamente.`})
})

router.post('/region/pais', agregarPais, async (req, res) => {
    pais = res.pais
    res.status(200).send({message: `El país ${pais} ha sido agregada exitosamente.`})
})

router.post('/region/ciudad', agregarCiudad, async (req, res) => {
    ciudad = res.ciudad
    res.status(200).send({message: `La ciudad ${ciudad} ha sido agregada exitosamente.`})
})

router.delete('/region/regiones', borrarRegion, async (req, res) =>{
    registro = res.registro
    if(!registro){
        res.status(404).send({error: `No se pudo eliminar la region/pais ${registro}.`})
    }else{
        res.status(200).send({message: `La region ${registro} ha sido eliminado exitosamente.`})
    }
})

router.delete('/region/paises', borrarRegion, async (req, res) =>{
    registro = res.registro   
    if(!registro){
        res.status(404).send({error: `No se pudo eliminar la region/pais ${registro}.`})
    }else{
        res.status(200).send({message: `El país ${registro} ha sido eliminado exitosamente.`})
    }
})

router.delete('/region/ciudades', borrarRegion, async (req, res) =>{
    registro = res.registro
    if(!registro){
        res.status(404).send({error: `No se pudo eliminar la region/pais ${registro}.`})
    }else{
        res.status(200).send({message: `La ciudad ${registro} ha sido eliminado exitosamente.`})
    }
})

router.put('/region/paises', editarPais, async (req, res) => {
    id = res.id
    res.status(200).send({message: `El país con id:${id} ha sido modificado correctamente.`});
})

router.put('/region/ciudades', editarCiudad, async (req, res) => {
    id = res.id
    res.status(200).send({message: `La ciudad con id:${id} ha sido modificada correctamente.`});
})



module.exports = router;
