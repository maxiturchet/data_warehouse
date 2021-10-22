const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const validarDatos = middlewares.validarDatos;

router.post('/login', validarDatos, async (req, res) =>{
    token = res.jwt;
    res.status(200).send({token: token})
});

module.exports = router;