# data_warehouse
**Data Warehouse es una herramienta que permita a una compañía de Marketing administrar todos los contactos de
sus clientes para sus campañas. 
Realiza CRUD de usuarios, contactos, regiones(paises y ciudades) y compañías. 
Utilizando: 
- HTML, CSS y JavaScript (Frontend)
- Node.js y Express.js (Backend).
- MySQL (MariaDB) (Base de datos) **

# ¿Qué herramientas usé para este proyecto?

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [Sequelize](https://sequelize.org/)
- [Nodemon](https://nodemon.io/)
- [Postman](https://www.postman.com/)
- [Flag-Icon-CSS] (https://flagicons.lipis.dev/)

## Bajar el repositorio a mi computadora:

En el respositorio `https://github.com/maxiturchet/data_warehouse.git` presionar en el botón verde que dice "Code".
- Si tenés la versión de escritorio de GitHub: podés clonar el respositorio y abrirlo desde tu editor de código.
- Si no tenés la versión de escritorio de GitHub: podés descargar el zip directamente con todos los archivos 
y arrastrarlos a tu editor de código.

# ¿Cómo correr la API localmente?

Para lograr correr la API de forma local es necesario contar con [XAMPP](https://www.apachefriends.org/index.html).
Luego de descargarlo tenés que iniciar el servidor Apache y la base de datos MySQL presionando en "start" en cada uno de ellos.
Luego, al presionar en "admin" en MySQL se abrirá una página de PHPMyAdmin con la base de datos.

## Instalar las dependencias y paquetes

Estando en el editor de código con el repositorio agregado, abrir la terminal en la carpeta [Server](https://github.com/maxiturchet/data_warehouse/tree/main/server). 
Podés hacer esto haciendo click derecho en el archivo y presionando en la opción "Open in integrated Terminal".
Para poder agregar la carpeta "node_modules" y disponer de los paquetes necesarios para usar el servicio tenés que escribir en la terminal:

`npm i`

Al presionar ENTER debería comenzar la instalación de los paquetes y dependencias necesarias.

## Configurar la base de datos

1. Es necesario editar el archivo [sequelize.js](https://github.com/maxiturchet/data_warehouse/blob/main/database/config/sequelize.js)
y cambiar los datos para que coincida con tu configuración, la estructura es
(**mysql://user:password@host:port/database**).

2. Ahora es necesario importar en PHPMyAdmin los datos de la base de datos. 
También podés agregar tus propios datos, pero importar la base de datos te dará una idea de como está organizada la base de datos. 
En la página de PHPMyAdmin ir a la pestaña "Importar" y ahí seleccionar el archivo: [data_warehouse.sql](https://github.com/maxiturchet/data_warehouse/blob/main/database/sql_queries/data_warehouse.sql).


## Hora de correr el servidor!

Ir al directorio [Server](https://github.com/maxiturchet/delilah_resto/tree/main/server) en tu editor de código,
hacé click derecho en el archivo "app.js" y seleccioná "Open in integrated Terminal". 
Se abrirá una terminal en la cual tenemos que escribir:

`nodemon app.js`

En caso de no haber ningún error debe aparecer la leyenda: "Servidor está corriendo en el puerto 3000" seguido de: "Conectado a Sequelize".

## Iniciar la parte del Frontend de la página
Ahora sí podemos ingresar a la página (si lo hacíamos antes de iniciar el servidor no ibamos a poder superar la página de Login).
Hacé click derecho sobre cualquier archivo .html (cualquiera de ellos te redireccionará a login.html). 
Coloca el usuario "maxiturchet" y la contraseña "123456" y podrás ingresar a todas las funciones de la página ya que ingresarás como administrador.
En caso de no querer iniciar como administrador, debes ingresar con cualquiera de los demás usuarios (sus datos están en la base de datos en la tabla de "usuarios")

Y eso es todo, ya está listo para hacer las modificaciones que desees sobre los datos que se encuentran en la página.

