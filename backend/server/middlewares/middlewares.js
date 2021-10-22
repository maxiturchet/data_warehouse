const express = require('express');
const myDataBase = require ('../../database/config/sequelize');
const { sequelize } = require('../../database/config/sequelize');
const token = require ('../jwt/token');
const e = require('express');


/* Middlewares Usuarios */
async function buscarUsuarioPorNombre(usuario){
    try{
        const nombreUsuario = await myDataBase.sequelize.query('SELECT * FROM usuarios WHERE usuario = :unUsuario',
                                                            {replacements: {unUsuario: usuario}, type:myDataBase.sequelize.QueryTypes.SELECT});
        return nombreUsuario;
    }catch(err){
        console.log(err);
    }
}
async function buscarUsuarioPorId(id){
    try{
        const idUsuario = await myDataBase.sequelize.query('SELECT * FROM usuarios WHERE id_usuarios = :unId',
                                                            {replacements: {unId: id}, type:myDataBase.sequelize.QueryTypes.SELECT});
        return idUsuario;
    }catch(err){
        console.log(err);
    }
}
async function buscarUsuario(usuario, password){
    try{
        const datosUsuario = await myDataBase.sequelize.query('SELECT * FROM usuarios WHERE usuario = :unUsuario AND password = :unaPassword',
                                                        {replacements: {unUsuario: usuario, unaPassword: password}, type: myDataBase.sequelize.QueryTypes.SELECT});
        return datosUsuario;
        
    }catch(err){
        console.log(err);
    }
}
async function obtenerUsuarios(){
    try{
        const selectUsuarios = await myDataBase.sequelize.query('SELECT * FROM usuarios',
                                                                {type: myDataBase.sequelize.QueryTypes.SELECT});
        return selectUsuarios;
    }catch(err){
        console.log(err);
    }
}
async function borrarUsuario(id){
    try{
        const borrar = await myDataBase.sequelize.query('DELETE FROM usuarios WHERE id_usuarios = :unId',
                                            {replacements: {unId: id}});
        return borrar
    }catch(err){
        console.log(err)
    }
}
async function agregarUsuario(req, res, next){
    try{
        const {usuario, nombre, apellido, email, 
                perfil, password, repetirPass} = req.body;
        console.log(perfil)
        let perfilUsuario = perfil
        if(perfilUsuario == 'Admin' || perfilUsuario == 'admin' || perfilUsuario == 'ADMIN'){
            perfilUsuario = 1
        }else{
            perfilUsuario = null;
        }
        const usuarios = await buscarUsuarioPorNombre(usuario)
        if(usuarios.length != 0){
            return res.status(400).send({error400: 'El nombre de usuario ingresado ya está en uso'})
        }else{
            if(!usuario || !nombre || !apellido || !email || !password || !repetirPass || (password != repetirPass)){
                return res.status(400).send({error400a: 'Parámetros incorrectos o faltantes'});
            }else{                
                const nuevoUsuario = await myDataBase.sequelize.query('INSERT INTO usuarios (usuario, nombre, apellido, email, password, is_admin) '
                                                        + `VALUES ('${usuario.trim()}', '${nombre}', '${apellido}','${email}','${password}','${perfilUsuario}')`)
            res.nuevoUsuario = usuario
            
            return next();
            }
        }
    }catch(err){
        console.log(err)
    }
}
async function validarDatos(req, res, next){
    try{
        const {usuario, password} = req.body;
        const usuarios = await buscarUsuario(usuario, password);
        let jwt;
        if(usuarios.length !=0){
            const jwtClave = token.jwtClave;
            jwt = token.jwt.sign({usuario: usuario, email: usuarios[0].email}, jwtClave);
            res.jwt = jwt;
            return next()
        }else{
            res.status(400).send({error: 'Usuario o contraseña inválidos o inexistentes'});
        }
    }catch(err){
        console.log(err);
    }
}
async function obtenerPerfilUsuario(req, res, next) {
    try{
        const tkn = req.headers.authorization.split(" ")[1];
        if(!tkn){
            res.status(403).send({error: 'No tiene los permisos necesarios'})
         }else{
            const validarTokenAdmin = token.jwt.verify(tkn, token.jwtClave);
            console.log('Validar Token: ', validarTokenAdmin);
            const buscar = await buscarUsuarioPorNombre(validarTokenAdmin.usuario);
            console.log('Usuario', buscar[0].is_admin)
            res.admin = buscar[0].is_admin
            next()
        }
    }catch (err) {
        if(err.name == 'TokenExpiredError'){        
            res.status(401).send({error: 'Token expirado'})
        }else{
            res.status(400).send({error: 'Token inválido'})
        }
        console.log(err);
    }
}
async function modificarUsuario (req, res, next) {
    try{ 
        let {idEd, usuarioEd, nombreEd, apellidoEd, emailEd, 
            perfilEd, passwordEd} = req.body;
        if(perfilEd == 'Admin' || perfilEd == 'admin' || perfilEd == 'ADMIN'){
            perfilEd = 1
        }else{
            perfilEd = null
        }
        const encontrarUsuario = await buscarUsuarioPorId(idEd);
        if(!encontrarUsuario){
            res.status(400).send({error: `El estado que intenta ingresar es inválido o ya está en uso.`});
        }else{
            const cambiarUsuario = await myDataBase.sequelize.query(`UPDATE usuarios SET usuario = '${usuarioEd}', nombre = '${nombreEd}', apellido = '${apellidoEd}', 
                                                         email = '${emailEd}', password = '${passwordEd}', is_admin = '${perfilEd}' WHERE id_usuarios = '${idEd}'`);
            res.id = idEd;
            console.log('ID', res.id)
            return next();
        }
    }catch(err){
        console.log(err);
    }
}

/*Middlewares Region*/

async function obtenerRegionPaises (req, res, next) {
    let dataRegiones = await myDataBase.sequelize.query(`SELECT regiones.nombre_regiones FROM regiones`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT})

    let dataPaises = await myDataBase.sequelize.query(`SELECT * FROM paises`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT})
    
    let dataLugares = await myDataBase.sequelize.query(`SELECT regiones.nombre_regiones, paises.nombre_paises, paises.bandera, ciudades.nombre_ciudades FROM paises 
                                                INNER JOIN regiones ON regiones.id_regiones = paises.region_id 
                                                INNER JOIN ciudades ON ciudades.pais_id = paises.id_paises`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT})
    
    regionesArray = dataRegiones.filter(o => !dataLugares.some(i => i.nombre_regiones === o.nombre_regiones))
    paisesArray = dataPaises.filter(o => !dataLugares.some(i => i.nombre_paises === o.nombre_paises))
       
    if(paisesArray){ 
        for(let i = 0; i < paisesArray.length; i++){
            let id = paisesArray[i].region_id
            const region = await obtenerRegionPorId(id)
            dataLugares.push({
                nombre_regiones: region[0].nombre_regiones,
                nombre_paises: paisesArray[i].nombre_paises,
                bandera: paisesArray[i].bandera,                
            })
        }
        regionesArray2 = dataRegiones.filter(o => !dataLugares.some(i => i.nombre_regiones === o.nombre_regiones))
        for(let y = 0; y < regionesArray2.length; y++){
            dataLugares.push({
                nombre_regiones: regionesArray2[y].nombre_regiones
            })
        }
    }
    return dataLugares
}

async function obtenerRegiones (req, res, next) {
    let regiones = await myDataBase.sequelize.query(`SELECT regiones.nombre_regiones FROM regiones`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT})
    return regiones
}
async function obtenerPaises (req, res, next) {
    let paises = await myDataBase.sequelize.query(`SELECT paises.nombre_paises FROM paises`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT})
    return paises
}
async function obtenerCiudades (req, res, next) {
    let ciudades = await myDataBase.sequelize.query(`SELECT ciudades.nombre_ciudades FROM ciudades`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT})
    return ciudades
}

async function buscarDatosRegion (regiones, lugar) {
    try{
        const region = `nombre_${regiones}`
        let datosRegion = await myDataBase.sequelize.query(`SELECT * FROM ${regiones} WHERE ${region} = :unLugar`, 
                                                            {replacements: {unLugar: lugar}, type: myDataBase.sequelize.QueryTypes.SELECT})
        return datosRegion
    }catch(err){
        console.log(err)
    }
}

async function buscarHijosRegion (regiones, regionPadre, lugar) {
    try{
        const region = `nombre_${regiones}`
        let datosRegion = await myDataBase.sequelize.query(`SELECT ${region} FROM ${regiones} WHERE ${regionPadre}_id = :unLugar`, 
                                                            {replacements: {unLugar: lugar}, type: myDataBase.sequelize.QueryTypes.SELECT})
        console.log('DATOS REGION', datosRegion)
        return datosRegion
    }catch(err){
        console.log(err)
    }
}

async function obtenerRegionPorId(id){
    const nombreRegion = await myDataBase.sequelize.query('SELECT nombre_regiones FROM regiones WHERE id_regiones = :unId',
                                                        {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT})
    return nombreRegion
}
async function obtenerPaisPorId(id){
    const nombrePais = await myDataBase.sequelize.query('SELECT nombre_paises FROM paises WHERE id_paises = :unId',{replacements:{unId: id}, type:myDataBase.sequelize.QueryTypes.SELECT})
    return nombrePais
}
async function obtenerPaisYRegionId(id){
    const nombrePais = await myDataBase.sequelize.query('SELECT nombre_regiones, nombre_paises FROM regiones INNER JOIN paises WHERE regiones.id_regiones = paises.region_id AND id_paises = :unId',   {replacements:{unId: id}, type:myDataBase.sequelize.QueryTypes.SELECT})
    return nombrePais
}
async function obtenerCiudadPorId(id){
    const nombreCiudad = await myDataBase.sequelize.query('SELECT nombre_ciudades FROM ciudades WHERE id_ciudades = :unId',
                                                {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT})
    return nombreCiudad
}
async function convertirNombreCiudadAId (nombre){
    const idCiudad = await myDataBase.sequelize.query('SELECT id_ciudades FROM ciudades WHERE nombre_ciudades = :unNombre',
                                                    {replacements: {unNombre: nombre}, type:myDataBase.sequelize.QueryTypes.SELECT})
    return idCiudad
}
async function convertirNombreRegionAId (nombre){
    const idRegion = await myDataBase.sequelize.query('SELECT id_regiones FROM regiones WHERE nombre_regiones = :unNombre',
                                                    {replacements: {unNombre: nombre}, type:myDataBase.sequelize.QueryTypes.SELECT})
    return idRegion
}
async function convertirNombrePaisAId (nombre){
    const idRegion = await myDataBase.sequelize.query('SELECT id_paises FROM paises WHERE nombre_paises = :unNombre',
                                                    {replacements: {unNombre: nombre}, type:myDataBase.sequelize.QueryTypes.SELECT})
    return idRegion
}
async function borrarRegion (req, res, next){
    try{
        const {tabla, registro} = req.body;
        if(!tabla || !registro){ 
            res.status(404).send({error: 'Datos inválidos. No se pudo eliminar la región/país seleccionado.'})
        }else{
            const borrar = await myDataBase.sequelize.query(`DELETE FROM ${tabla} WHERE nombre_${tabla} = :unRegistro`,
                                                            {replacements: {unRegistro: registro}}); 
            res.registro = registro
            return next();
        }
    }catch(err){
        console.log(err)
    }
}
async function editarPais (req, res,next){
    try{
        const {idEdLugar, idRegionEd, banderaIso, nombreLugar} = req.body;
        const paises = 'paises'
        const buscarPais = await buscarDatosRegion(paises, idEdLugar);
        if(!buscarPais){
            res.status(400).send({error: `El país que intenta ingresar no existe`});
        }else{
            const cambiarPais = await myDataBase.sequelize.query(`UPDATE paises SET region_id = '${idRegionEd}',
                                                                 bandera = '${banderaIso}', nombre_paises = '${nombreLugar}' 
                                                                 WHERE paises.id_paises = '${idEdLugar}'`)
            res.id = idEdLugar 
            return next()
        }
    }catch(err){
        console.log(err)
    }
}
async function editarCiudad (req, res,next){
    try{
        const {idEdLugar, idRegionEd, nombreLugar} = req.body;
        const ciudades = 'ciudades'
        const buscarCiudad = await buscarDatosRegion(ciudades, idEdLugar);
        if(!buscarCiudad){
            res.status(400).send({error: `El país que intenta ingresar no existe`});
        }else{
            const cambiarCiudad = await myDataBase.sequelize.query(`UPDATE ciudades SET pais_id = '${idRegionEd}',
                                                                 nombre_ciudades = '${nombreLugar}' WHERE ciudades.id_ciudades = '${idEdLugar}'`)
            res.id = idEdLugar 
            return next()
        }
    }catch(err){
        console.log(err)
    }
}
async function agregarRegion (req, res, next){
    try{
        const {nombreRegion} = req.body;
        const regiones = 'regiones'
        const verificarExistencia = await buscarDatosRegion(regiones, nombreRegion)
        if(verificarExistencia == 0){
            const agregarRegion = await myDataBase.sequelize.query(`INSERT INTO regiones (id_regiones, nombre_regiones) VALUES (NULL, '${nombreRegion}');`)
            res.region = nombreRegion
            return next()
        }else{
            res.status(400).send({error: 'La región que intenta ingresar ya existe.'})
        }
        
    }catch(err){
        console.log(err)
    }
}
async function agregarPais (req, res, next){
    try{
        const {nombreRegionPais, nombrePais, isoBandera} = req.body;
        const paises = 'paises'
        const regiones = 'regiones'
        const isoBanderaCode = isoBandera.toLowerCase()
        const verificarExistencia = await buscarDatosRegion(paises, nombrePais)
        const region = await buscarDatosRegion (regiones, nombreRegionPais)
        if(verificarExistencia == 0){
            const agregarPais = await myDataBase.sequelize.query(`INSERT INTO paises (id_paises, region_id, bandera, nombre_paises) VALUES (NULL, '${region[0].id_regiones}','${isoBanderaCode}','${nombrePais}');`)
            res.pais = nombrePais
            return next()
        }else{
            res.status(400).send({error: 'El pais que intenta ingresar ya existe.'})
        }
        
    }catch(err){
        console.log(err)
    }
}
async function agregarCiudad (req, res, next){
    try{
        const {nombrePaisCiudad, nombreCiudad} = req.body;
        const paises = 'paises'
        const ciudades = 'ciudades'
        const verificarExistencia = await buscarDatosRegion(ciudades, nombreCiudad)
        const pais = await buscarDatosRegion (paises, nombrePaisCiudad)
        if(verificarExistencia == 0){
            const agregarCiudad = await myDataBase.sequelize.query(`INSERT INTO ciudades (id_ciudades, pais_id, nombre_ciudades) VALUES (NULL, '${pais[0].id_paises}','${nombreCiudad}');`)
            res.ciudad = nombreCiudad
            return next()
        }else{
            res.status(400).send({error: 'La ciudad que intenta ingresar ya existe.'})
        }
        
    }catch(err){
        console.log(err)
    }
}

/* Middlewares companias */
async function traerCompanias (req, res, next){
    const companias = await myDataBase.sequelize.query(`SELECT * FROM companias`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
    return companias
}
async function traerCompaniasPorNombre (nombre){
    const companias = await myDataBase.sequelize.query('SELECT * FROM companias WHERE nombre_compania = :unNombre',
                                            {replacements: {unNombre: nombre}, type: myDataBase.sequelize.QueryTypes.SELECT});
    return companias
}
async function obtenerCompaniasId (nombre){
    const companias = await myDataBase.sequelize.query('SELECT id_compania FROM companias WHERE nombre_compania = :unNombre',
                                            {replacements: {unNombre: nombre}, type: myDataBase.sequelize.QueryTypes.SELECT});
    return companias
}
async function buscarCompaniaPorId (id){
    const companias = await myDataBase.sequelize.query('SELECT * FROM companias WHERE id_compania = :unId',
                                            {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT})
    return companias                                            
}
async function modificarCompania (req, res, next) {
    try{ 
        const {idCompania, companiaNombre, ciudadCompania, direccionCompania, emailCompania, telefonoCompania} = req.body;
        console.log(idCompania, companiaNombre, ciudadCompania, direccionCompania, emailCompania, telefonoCompania)
        const idCiudad = await convertirNombreCiudadAId(ciudadCompania)
        const encontrarCompania = await buscarCompaniaPorId(idCompania);
        if(idCiudad == !idCiudad){
            return res.status(404).send({error404: 'La ciudad que intenta ingresar no existe en la base de datos.'})
        }else{
            if(!encontrarCompania){
                return res.status(400).send({error: 'La compañía que quiere modificar no existe'})
            }else{
                const cambiarUsuario = await myDataBase.sequelize.query(`UPDATE companias SET nombre_compania = '${companiaNombre}', id_ciudades_companias = '${idCiudad[0].id_ciudades}', direccion_compania = '${direccionCompania}', email_compania = '${emailCompania}', telefono_compania = '${telefonoCompania}' WHERE companias.id_compania = '${idCompania}'`);
                res.id = idCompania;
                console.log('ID', res.id)
                return next();
            }
        }
    }catch(err){
        console.log(err);
    }
}
async function borrarCompania (id) {
    try{
        const borrarCompania = await myDataBase.sequelize.query('DELETE FROM companias WHERE id_compania = :unId',
                                            {replacements: {unId: id}});
        return borrarCompania
    }catch(err){
        console.log(err)
    }
}
async function agregarCompania (req, res, next){
    try{
        const {companiaNombre, ciudadCompania, direccionCompania, emailCompania, telefonoCompania} = req.body;
        const idCiudad = await convertirNombreCiudadAId(ciudadCompania)
        const companias = await traerCompaniasPorNombre(companiaNombre)
        if(companias.length != 0){
            return res.status(400).send({error400: 'La compañía ingresada ya existe'})
        }else{            
            if(idCiudad == !idCiudad){
                return res.status(404).send({error404: 'La ciudad que intenta ingresar no existe en la base de datos.'})
            }
            else{
                if(!companiaNombre || !ciudadCompania || !direccionCompania || !emailCompania || !telefonoCompania){
                    return res.status(400).send({error: 'Parámetros incorrectos o faltantes'});
                }else{                
                    const nuevaCompania = await myDataBase.sequelize.query('INSERT INTO companias (nombre_compania, id_ciudades_companias, direccion_compania, email_compania, telefono_compania)' + `VALUES ('${companiaNombre}', '${idCiudad[0].id_ciudades}', '${direccionCompania}','${emailCompania}','${telefonoCompania}')`)
                    res.nuevaCompania = nuevaCompania
                    console.log(nuevaCompania)
                    return next();
                }
            }
        }   
    }catch(err){
        console.log(err)
    }
}

/* Middlewares Contactos */
async function traerContactos (req, res, next){
    const contactos = await myDataBase.sequelize.query(`SELECT * FROM contactos`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
    return contactos
}
async function ordenAscendente (tabla){
    if(tabla == 'id_pais'){
        const paises = await myDataBase.sequelize.query(`SELECT * FROM contactos JOIN paises ON contactos.id_pais = paises.id_paises JOIN regiones ON paises.region_id = regiones.id_regiones ORDER BY paises.nombre_paises ASC`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
        return paises
    }
    if(tabla == 'id_compania'){
        const companias = await myDataBase.sequelize.query(`SELECT * FROM contactos INNER JOIN companias ON contactos.id_compania = companias.id_compania ORDER BY companias.nombre_compania ASC`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
        return companias
    }
    else{
        const contactos = await myDataBase.sequelize.query(`SELECT * FROM contactos ORDER BY contactos.${tabla} ASC`,
                                                {type: myDataBase.sequelize.QueryTypes.SELECT});
        return contactos
    }
}
async function ordenDescendente (tabla){
    if(tabla == 'id_pais'){
        const paises = await myDataBase.sequelize.query(`SELECT * FROM contactos JOIN paises ON contactos.id_pais = paises.id_paises JOIN regiones ON paises.region_id = regiones.id_regiones ORDER BY paises.nombre_paises DESC`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
        return paises
    }if(tabla == 'id_compania'){
        const companias = await myDataBase.sequelize.query(`SELECT * FROM contactos INNER JOIN companias ON contactos.id_compania = companias.id_compania ORDER BY companias.nombre_compania DESC`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
        return companias
    }else{
        const contactos = await myDataBase.sequelize.query(`SELECT * FROM contactos ORDER BY contactos.${tabla} 
        DESC`,
                                            {type: myDataBase.sequelize.QueryTypes.SELECT});
        return contactos
    }
}
async function obtenerCanales(){
    const canales = await myDataBase.sequelize.query(`SELECT nombre_canales FROM canales`, {type: myDataBase.sequelize.QueryTypes.SELECT})
    return canales
}
async function obtenerCanalesContacto (id){
    const canalesDeContacto = await myDataBase.sequelize.query('SELECT id_contactos, GROUP_CONCAT(id_canales) AS canales FROM contactos_canales WHERE id_contactos = :unId',
                                                    {replacements: {unId: id}, type: myDataBase.sequelize.QueryTypes.SELECT})
    
    let canalesContacto = []                                                    
    const canales = canalesDeContacto[0].canales.split(',')
    for(let i = 0; i < canales.length; i++){
        const canalesId = canales[i]
        console.log('CANALES ID', parseInt(canalesId))
        const datosCanal = await myDataBase.sequelize.query(`SELECT * FROM contactos_canales WHERE id_canales = ${canalesId} AND id_contactos = ${id}`,
        {type: myDataBase.sequelize.QueryTypes.SELECT})
        canalesContacto.push(datosCanal)
    }
    console.log('CANALES', canalesContacto)
    return canalesContacto
}
async function obtenerCanalesNombre (id){
    const stringCanales = await myDataBase.sequelize.query(`SELECT nombre_canales FROM canales WHERE id_canales_preferidos = ${id}`, {type: myDataBase.sequelize.QueryTypes.SELECT})
    return stringCanales
}
async function obtenerCanalesId (nombre){
    const idCanales = await myDataBase.sequelize.query(`SELECT id_canales_preferidos FROM canales WHERE nombre_canales = '${nombre}'`, {type: myDataBase.sequelize.QueryTypes.SELECT})
    return idCanales
}
async function obtenerCanalesPreferidos(id){
    const canales = await myDataBase.sequelize.query('SELECT id_contactos, GROUP_CONCAT(id_canales) AS canales FROM contactos_canales WHERE id_contactos = :unId',
                                                    {replacements: {unId: id}, type:myDataBase.sequelize.QueryTypes.SELECT})

    const idCanales = canales[0].canales

    const stringCanales = await myDataBase.sequelize.query(`SELECT nombre_canales FROM canales WHERE
                                                        id_canales_preferidos IN (${idCanales})`)
    return stringCanales[0]
}
async function obtenerIdCanalesPreferidos(nombre){
    const idCanalPreferencia = await myDataBase.sequelize.query(`SELECT id_canal_preferencia FROM canal_preferencia WHERE nombre_preferencia = '${nombre}'`, {type: myDataBase.sequelize.QueryTypes.SELECT})
   
    return idCanalPreferencia
}
async function obtenerContactosPorNombreCompleto (nombre){
    const idContacto = await myDataBase.sequelize.query(`SELECT * FROM contactos WHERE nombre_contacto = :unNombre`,
                                                    {replacements: {unNombre: nombre}, type:myDataBase.sequelize.QueryTypes.SELECT})
    console.log('ID CONTACTO', idContacto)
    return idContacto
}
async function obtenerContactosPorId (id){
    const idContacto = await myDataBase.sequelize.query(`SELECT * FROM contactos WHERE id_contactos = :unId`,
                                                    {replacements: {unId: id}, type:myDataBase.sequelize.QueryTypes.SELECT})
    console.log('ID CONTACTO', idContacto)
    return idContacto
}
async function eliminarContactoPorId(req, res, next){
    const id = req.body
    const idExiste = await obtenerContactosPorId(id.nombre)
    console.log(idExiste)
    if(idExiste != 0){
        const eliminarContacto = await myDataBase.sequelize.query(`DELETE FROM contactos WHERE id_contactos = :unId`,
                                                            {replacements: {unId: id.nombre}})
        res.id = id.nombre
        return next()
    }else{
        return res.status(400).send({error: 'El contacto que intenta eliminar no existe.'})
    }
}
async function eliminarCanalesContacto (id){
    const eliminarCanales = await myDataBase.sequelize.query(`DELETE FROM contactos_canales WHERE contactos_canales.id_contactos = :unId`, {replacements: {unId: id}})
    console.log('ID CONTACTO', id)
    return eliminarCanales
}
async function obtenerIdContactoPorNombre (nombre){
    const idContacto = await myDataBase.sequelize.query(`SELECT id_contactos FROM contactos WHERE nombre_contacto = :unNombre`,
                                                    {replacements: {unNombre: nombre}, type:myDataBase.sequelize.QueryTypes.SELECT})
    console.log('ID CONTACTO', idContacto)
    return idContacto
}
async function eliminarContacto (req, res, next) {
    try{
        const nombre = req.body
        console.log(nombre.nombre)
        const contacto = await obtenerContactosPorNombreCompleto(nombre.nombre)
        if(contacto != 0){
            const borrarContactos = await myDataBase.sequelize.query(`DELETE FROM contactos WHERE nombre_contacto = :unNombre`,            
                                                                        {replacements: {unNombre: nombre.nombre}})
            res.nombre = nombre.nombre
            return next()
        }else{
            return res.status(400).send({error: 'El contacto que intenta eliminar no existe.'});
        }
    }catch(err){
        console.log(err)
    }
}
async function eliminarContactosSeleccionados (req, res, next) {
    try{
        const nombre = req.body
        console.log(nombre.contactos)
        console.log(nombre.contactos.length)
        for(let i = 0; i < nombre.contactos.length; i++){
            const contactoId = await obtenerContactosPorNombreCompleto(nombre.contactos[i])
            console.log(contactoId[0].id_contactos)
            const borrarContactos = await myDataBase.sequelize.query(`DELETE FROM contactos WHERE id_contactos = :unId`,            
                                                                    {replacements: {unId: contactoId[0].id_contactos}})
        next()
        }        
    }catch(err){
        console.log(err)
    }
}
async function modificarContacto (req, res, next){
    console.log('REQ BODY', req.body)
    const {idContacto, contactoNombre, contactoApellido, emailContacto, contactoDireccion, selectCiudad, selectPais, selectRegion, companiaContacto, cargoContacto, porcentajeInteres, canales} = req.body;
    const nombre  = contactoNombre + ' ' + contactoApellido
    console.log(contactoDireccion)
    const idCiudad = await convertirNombreCiudadAId(selectCiudad)
    console.log(idCiudad[0].id_ciudades)
    const idPais = await convertirNombrePaisAId(selectPais)
    const idRegion  = await convertirNombreRegionAId(selectRegion)
    const idCompania = await obtenerCompaniasId(companiaContacto)
    const editarContacto = await myDataBase.sequelize.query(`UPDATE contactos SET nombre_contacto = '${nombre}', email_contacto = '${emailContacto}', direccion_contacto = '${contactoDireccion}',
                                                    id_ciudad = '${idCiudad[0].id_ciudades}', id_pais = '${idPais[0].id_paises}', id_region = '${idRegion[0].id_regiones}', id_compania = '${idCompania[0].id_compania}', cargo_contacto = '${cargoContacto}', interes_contacto = '${porcentajeInteres}' WHERE contactos.id_contactos = '${idContacto}'`)
    res.editarContacto = nombre

    const canalesContacto = await eliminarCanalesContacto(idContacto)
    console.log('LALALAL', canalesContacto)
   
    for(let i = 0; i < canales.length; i++){
        const contacto = await obtenerIdContactoPorNombre(nombre)
        const idCanales = await obtenerCanalesId(canales[i].canalContacto)
        const idCanalesPreferencia = await obtenerIdCanalesPreferidos(canales[i].canalPreferencia)
        const agregarCanales = await myDataBase.sequelize.query('INSERT INTO contactos_canales (id_contactos, id_canales, dato_canal, id_preferencia_canal)' + `VALUES ('${contacto[0].id_contactos}', '${idCanales[0].id_canales_preferidos}', '${canales[i].canalInfo}', '${idCanalesPreferencia[0].id_canal_preferencia}')`)
    }
    return next()
}
async function agregarContacto (req, res, next){
    try{
        const {contactoNombreA, contactoApellidoA, cargoContactoA, emailContactoA, companiaContactoA, selectRegionAgregar, selectPaisAgregar, selectCiudadAgregar, contactoDireccionAgregar, porcentajeInteres, canales} = req.body;
        const nombre = contactoNombreA + ' ' + contactoApellidoA
        console.log(nombre)
        const idRegion = await convertirNombreRegionAId(selectRegionAgregar)
        const idPais = await convertirNombrePaisAId(selectPaisAgregar)
        const idCiudad = await convertirNombreCiudadAId(selectCiudadAgregar)
        const idCompania = await obtenerCompaniasId(companiaContactoA)
        const contacto = await obtenerContactosPorNombreCompleto(nombre)
        if(contacto.length != 0){
            return res.status(400).send({error400: 'El contacto ingresado ya existe'})
        }else{            
            if(!contactoNombreA || !contactoApellidoA || !cargoContactoA || !emailContactoA || !companiaContactoA || !selectRegionAgregar || !selectPaisAgregar || !selectCiudadAgregar || !contactoDireccionAgregar || !porcentajeInteres || !canales){
                return res.status(400).send({error: 'Parámetros incorrectos o faltantes'});
            }else{                
                const nuevoContacto = await myDataBase.sequelize.query('INSERT INTO contactos (nombre_contacto, email_contacto, direccion_contacto, id_ciudad, id_pais, id_region, id_compania, cargo_contacto, interes_contacto)' + `VALUES ('${nombre}', '${emailContactoA}', '${contactoDireccionAgregar}', '${idCiudad[0].id_ciudades}', '${idPais[0].id_paises}', '${idRegion[0].id_regiones}', '${idCompania[0].id_compania}','${cargoContactoA}','${porcentajeInteres}')`)
                res.nuevoContacto = nuevoContacto
                console.log(nuevoContacto)
                if(nuevoContacto){
                    for(let i = 0; i < canales.length; i++){
                        const contacto = await obtenerIdContactoPorNombre(nombre)
                        const idCanales = await obtenerCanalesId(canales[i].canalContacto)
                        const idCanalesPreferencia = await obtenerIdCanalesPreferidos(canales[i].canalPreferencia)
                        const agregarCanales = await myDataBase.sequelize.query('INSERT INTO contactos_canales (id_contactos, id_canales, dato_canal, id_preferencia_canal)' + `VALUES ('${contacto[0].id_contactos}', '${idCanales[0].id_canales_preferidos}', '${canales[i].canalInfo}', '${idCanalesPreferencia[0].id_canal_preferencia}')`)
                    }
                }
                return next();
            }
        }   
    }catch(err){
        console.log(err)
    }
}
async function obtenerContactosFiltrados(search){
    const input = search;
    const contactos = await myDataBase.sequelize.query(`SELECT * FROM contactos
                INNER JOIN companias ON companias.id_compania = contactos.id_compania 
                INNER JOIN regiones ON regiones.id_regiones = contactos.id_region 
                INNER JOIN paises ON paises.id_paises = contactos.id_pais 
                INNER JOIN ciudades ON ciudades.id_ciudades = contactos.id_ciudad 
                INNER JOIN contactos_canales ON contactos_canales.id_contactos = contactos.id_contactos
                INNER JOIN canales ON canales.id_canales_preferidos = contactos_canales.id_canales
                WHERE (nombre_contacto LIKE '%${input}%'  
                        OR email_contacto LIKE '%${input}%'   
                        OR direccion_contacto LIKE '%${input}%'  
                        OR cargo_contacto LIKE '%${input}%'   
                        OR interes_contacto LIKE '%${input}%'   
                        OR nombre_ciudades LIKE '%${input}%'   
                        OR nombre_paises LIKE '%${input}%'  
                        OR nombre_regiones LIKE '%${input}%'  
                        OR nombre_compania LIKE '%${input}%' 
                        OR nombre_canales LIKE '%${input}%')
                GROUP BY contactos.id_contactos`,
                        {type: myDataBase.sequelize.QueryTypes.SELECT});
    return contactos
}

module.exports = {
                /* Middlewares Usuarios*/
                buscarUsuario, validarDatos, obtenerPerfilUsuario, obtenerUsuarios, buscarUsuarioPorNombre,
                buscarUsuarioPorId, agregarUsuario, borrarUsuario, modificarUsuario,

                /* Middlewares Region*/
                obtenerRegionPaises, buscarDatosRegion, obtenerPaisPorId, obtenerRegionPorId, borrarRegion, editarPais, editarCiudad, agregarRegion,
                agregarPais, agregarCiudad, obtenerPaisYRegionId, obtenerRegiones, obtenerPaises, obtenerCiudades, buscarHijosRegion, convertirNombreRegionAId,
                convertirNombrePaisAId,

                /* Middlewares Companias */
                traerCompanias, obtenerCiudadPorId, traerCompaniasPorNombre, modificarCompania, borrarCompania, buscarCompaniaPorId, agregarCompania,

                /* Middlewares Contactos */
                traerContactos, obtenerCanalesPreferidos, ordenAscendente, ordenDescendente, eliminarContactosSeleccionados, eliminarContacto, modificarContacto, obtenerContactosPorNombreCompleto, obtenerCanales, obtenerCanalesNombre, obtenerCanalesContacto,
                agregarContacto, obtenerContactosFiltrados, eliminarContactoPorId
}