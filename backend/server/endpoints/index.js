const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares')
const obtenerPerfilUsuario = middlewares.obtenerPerfilUsuario;
const traerContactos = middlewares.traerContactos;
const obtenerCanalesPreferidos = middlewares.obtenerCanalesPreferidos;
const obtenerRegionPorId = middlewares.obtenerRegionPorId;
const obtenerPaisPorId = middlewares.obtenerPaisPorId;
const obtenerCiudadPorId = middlewares.obtenerCiudadPorId;
const buscarCompaniaPorId = middlewares.buscarCompaniaPorId;
const ordenDescendente = middlewares.ordenDescendente;
const ordenAscendente = middlewares.ordenAscendente;
const eliminarContactosSeleccionados = middlewares.eliminarContactosSeleccionados;
const eliminarContacto = middlewares.eliminarContacto;
const eliminarContactoPorId = middlewares.eliminarContactoPorId;
const modificarContacto = middlewares.modificarContacto;
const obtenerContactosPorNombreCompleto = middlewares.obtenerContactosPorNombreCompleto;
const obtenerCanales = middlewares.obtenerCanales;
const obtenerCanalesContacto = middlewares.obtenerCanalesContacto;
const obtenerCanalesNombre = middlewares.obtenerCanalesNombre;
const agregarContacto = middlewares.agregarContacto;
const obtenerContactosFiltrados = middlewares.obtenerContactosFiltrados;


router.get('/index/admin', obtenerPerfilUsuario, async (req, res) => {
    admin = res.admin;
    if(admin != 1){
        res.status(200).send({message: admin})
    }else{
        res.status(200).send({message: admin});
    }
})

router.get('/index', async (req, res) =>{
    res.status(200).send(await traerContactos())
})

router.get('/index/nombre/:name', async (req, res) =>{
    nombre = req.params.name
    console.log(nombre)

    res.status(200).send(await obtenerContactosPorNombreCompleto(nombre))
})

router.get('/index/ascendente/:tabla', async (req, res) =>{
    tabla = req.params.tabla
    res.status(200).send(await ordenAscendente(tabla))
})
router.get('/index/descendente/:tabla', async (req, res) =>{
    tabla = req.params.tabla
    res.status(200).send(await ordenDescendente(tabla))
})

router.get('/index/regiones/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await obtenerRegionPorId(id))
})

router.get('/index/paises/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await obtenerPaisPorId(id))
})

router.get('/index/ciudades/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await obtenerCiudadPorId(id))
})

router.get('/index/companias/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await buscarCompaniaPorId(id))
})

router.get('/index/canales', async (req, res) => {
    res.status(200).send(await obtenerCanales())
})


router.get('/index/canales/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await obtenerCanalesPreferidos(id))
})

router.get('/index/canales/info/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await obtenerCanalesContacto(id))
})

router.get('/index/canales/nombre/:id', async (req, res) => {
    id = req.params.id
    res.status(200).send(await obtenerCanalesNombre(id))
})

router.delete('/index/seleccionados', eliminarContactosSeleccionados, async (req, res) => {
    res.status(200).send({message: `Se han eliminado los contactos seleccionados satisfactoriamente.`})
})

router.delete('/index', eliminarContacto, async (req, res) => {
    nombre = res.nombre
    res.status(200).send({message: `${nombre} ha sido eliminado exitosamente.`})
})
router.delete('/index/id', eliminarContactoPorId, async (req, res) => {
    id = res.id
    res.status(200).send({message: `El contacto con ID:${id} ha sido eliminado exitosamente.`})
})

router.put('/index/contacto', modificarContacto, async (req, res) => {
    editarContacto = res.editarContacto
    res.status(200).send({message: `El contacto ${editarContacto} ha sido modificado exitosamente.`})
})

router.post('/index/contacto', agregarContacto, async(req, res) =>{
    nuevaContacto = res.nuevoContacto
    res.status(201).send({Ok:`El contacto '${nuevaContacto}' ha sido creado exitosamente.`});
})

router.get('/index/busqueda/:input', async(req, res) =>{
    input = req.params.input
    res.status(200).send(await obtenerContactosFiltrados(input))
})

module.exports = router;
