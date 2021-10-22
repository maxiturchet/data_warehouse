const express = require('express');
const app = express();
const cors = require('cors')
const loginRouter = require('./endpoints/login');
const indexRouter = require('./endpoints/index');
const usuariosRouter = require('./endpoints/usuarios');
const regionRouter = require('./endpoints/region');
const companiasRouter = require('./endpoints/companias');

/*const contactosRouter = require('/enpoints/contactos');
const companiasRouter = require('/enpoints/companias');*/

app.listen(3000, () =>{
    console.log('Servidor corriendo en puerto 3000');
});

app.use(cors());
app.use(express.json(), loginRouter, indexRouter, usuariosRouter, regionRouter, companiasRouter);

app.use((err, req, res, next) =>{
    if(err){
        res.status(500).send({error: 'Error interno del servidor'});
        console.log(err)
    }
    next();
});

module.exports = app;