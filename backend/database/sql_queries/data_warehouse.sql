-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2021 a las 20:14:46
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `data_warehouse`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canales`
--

CREATE TABLE `canales` (
  `id_canales_preferidos` int(10) NOT NULL,
  `nombre_canales` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canales`
--

INSERT INTO `canales` (`id_canales_preferidos`, `nombre_canales`) VALUES
(1, 'Email'),
(2, 'Facebook'),
(3, 'Instagram'),
(4, 'Llamada'),
(5, 'Linkedin'),
(6, 'Mensaje'),
(7, 'Pending'),
(8, 'Whatsapp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canal_preferencia`
--

CREATE TABLE `canal_preferencia` (
  `id_canal_preferencia` int(11) NOT NULL,
  `nombre_preferencia` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canal_preferencia`
--

INSERT INTO `canal_preferencia` (`id_canal_preferencia`, `nombre_preferencia`) VALUES
(1, 'Sin preferencias'),
(2, 'Canal favorito'),
(3, 'No molestar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudades`
--

CREATE TABLE `ciudades` (
  `id_ciudades` int(10) NOT NULL,
  `pais_id` int(10) NOT NULL,
  `nombre_ciudades` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudades`
--

INSERT INTO `ciudades` (`id_ciudades`, `pais_id`, `nombre_ciudades`) VALUES
(3, 2, 'Bogotá'),
(4, 2, 'Cúcuta'),
(5, 2, 'Medellín'),
(6, 3, 'Atacama'),
(7, 3, 'Santiago'),
(8, 3, 'Valparaíso'),
(9, 4, 'Canelones'),
(10, 4, 'Maldonado'),
(11, 4, 'Montevideo'),
(12, 5, 'Ciudad de México'),
(13, 5, 'Tijuana'),
(14, 6, 'Florida'),
(15, 6, 'Texas'),
(23, 1, 'Buenos Aires'),
(24, 1, 'Cordoba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companias`
--

CREATE TABLE `companias` (
  `id_compania` int(10) NOT NULL,
  `nombre_compania` varchar(30) NOT NULL,
  `id_ciudades_companias` int(15) NOT NULL,
  `direccion_compania` varchar(50) NOT NULL,
  `email_compania` varchar(30) NOT NULL,
  `telefono_compania` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `companias`
--

INSERT INTO `companias` (`id_compania`, `nombre_compania`, `id_ciudades_companias`, `direccion_compania`, `email_compania`, `telefono_compania`) VALUES
(1, 'Softtek', 12, 'Mexico 2002', 'sofftek@info.com', 15555555),
(2, 'Mercadolibre', 23, 'Moreno 2033', 'mercadolibre@info.com', 15555544),
(3, 'Rappi', 3, 'Colombia 2525', 'rappi@info.com', 15555557),
(4, 'Globant', 24, 'Sarmiento 2022', 'globant@info.com', 15555566),
(5, 'OLX', 4, 'Colombia 2525', 'olx@info.com', 15555577),
(6, 'Kio', 13, 'Guadalajara 4345', 'kio@info.com', 15555588),
(7, 'Despegar', 8, 'Santiago 2035', 'despegar@info.com', 155555559);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contactos` int(10) NOT NULL,
  `foto_contacto` varchar(50) DEFAULT NULL,
  `nombre_contacto` varchar(30) NOT NULL,
  `email_contacto` varchar(30) NOT NULL,
  `direccion_contacto` varchar(30) NOT NULL,
  `id_ciudad` int(3) NOT NULL,
  `id_pais` int(10) NOT NULL,
  `id_region` int(10) NOT NULL,
  `id_compania` int(20) NOT NULL,
  `cargo_contacto` varchar(50) NOT NULL,
  `interes_contacto` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id_contactos`, `foto_contacto`, `nombre_contacto`, `email_contacto`, `direccion_contacto`, `id_ciudad`, `id_pais`, `id_region`, `id_compania`, `cargo_contacto`, `interes_contacto`) VALUES
(4, NULL, 'Lenina Crowne', 'lenina@gmail.com', 'Av. Alvaro ', 12, 5, 2, 6, 'Customer Manager', 100),
(9, NULL, 'Elena Kuráguina', 'elenakura@gmail.com', 'Calle 75 626', 3, 2, 1, 2, 'Sr. Tech. Project Manager', 0),
(10, NULL, 'Anatol Kuraguin', 'anakura@gmail.com', 'Dean Keeton St 152', 15, 6, 2, 6, 'Full Stack Engineer', 50),
(11, NULL, 'Anna Mijáilovna', 'annamija@gmail.com ', 'Libertad 4512', 6, 3, 1, 2, 'Talent Acquisition Analyst', 75),
(12, NULL, 'Rodión Raskólnikov', 'rodia@gmail.com', 'undefined', 14, 6, 2, 1, 'Analista Senior', 100),
(13, NULL, 'Sonia Marmeládova', 'soniamarme@gmail.com', 'Juan Manuel de Rosas 1530', 3, 2, 1, 3, 'Full Stack Engineer', 25),
(30, NULL, 'Bernard Marx', 'bernardmarx@gmail.com', 'Ohiggins 3410', 6, 3, 1, 7, 'IT Recruiter', 75),
(32, NULL, 'Jim Hawkins', 'jimh@gmail.com', 'Benbow 2522', 14, 6, 2, 7, 'Software Developer', 75);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos_canales`
--

CREATE TABLE `contactos_canales` (
  `id_canales_contactos` int(10) NOT NULL,
  `id_contactos` int(10) NOT NULL,
  `id_canales` int(10) NOT NULL,
  `dato_canal` varchar(30) NOT NULL,
  `id_preferencia_canal` set('1','2','3') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contactos_canales`
--

INSERT INTO `contactos_canales` (`id_canales_contactos`, `id_contactos`, `id_canales`, `dato_canal`, `id_preferencia_canal`) VALUES
(29, 11, 2, 'facebook.com/annamija', '3'),
(30, 11, 7, '-', '1'),
(33, 13, 1, 'soniamarme@gmail.com', '2'),
(34, 13, 2, 'facebook.com/soniamarmeladova', '1'),
(35, 13, 4, '+549 155648402', '3'),
(42, 30, 1, 'bernardmarx@gmail.com', '2'),
(43, 30, 2, 'facebook.com/bernardmarx', '3'),
(78, 32, 1, 'jimh@gmail.com', '2'),
(79, 32, 3, '@jimhawkins', '3'),
(92, 12, 1, 'rodiaraskol@gmail.com ', '2'),
(93, 12, 8, '+512 159886321', '1'),
(103, 4, 2, 'facebook.com/leninacrowne', '2'),
(104, 4, 1, 'lenina@gmail.com', '1'),
(106, 9, 3, '@elenakura', '3'),
(108, 10, 6, '+585 1542144921', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paises`
--

CREATE TABLE `paises` (
  `id_paises` int(11) NOT NULL,
  `region_id` int(10) NOT NULL,
  `bandera` varchar(30) DEFAULT NULL,
  `nombre_paises` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paises`
--

INSERT INTO `paises` (`id_paises`, `region_id`, `bandera`, `nombre_paises`) VALUES
(1, 1, 'ar', 'Argentina'),
(2, 1, 'co', 'Colombia'),
(3, 1, 'cl', 'Chile'),
(4, 1, 'uy', 'Uruguay'),
(5, 2, 'mx', 'Mexico'),
(6, 2, 'us', 'Estados Unidos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `id_regiones` int(10) NOT NULL,
  `nombre_regiones` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id_regiones`, `nombre_regiones`) VALUES
(1, 'Sudamérica'),
(2, 'Norteamérica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(3) NOT NULL,
  `usuario` varchar(30) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `usuario`, `nombre`, `apellido`, `email`, `password`, `is_admin`) VALUES
(1, 'maxiturchet', 'maximiliano', 'turchet', 'maxiturchet@datawarehouse.com', '123456', 1),
(3, 'lichaspooner', 'Lisandro', 'Spooner', 'lisandrospooner@datawarehouse.com', '234567', 0),
(4, 'herbertspencer', 'Herberto', 'Spencer', 'herbertspencer@datawarehouse.com', '345678', 0),
(5, 'marianomoreno', 'Mariano', 'Moreno', 'marianomoreno@datawarehouse.com', '456789', 0),
(28, 'aldoushuxley', 'Aldous', 'Huxley', 'aldoushuxley@datawarehouse.com', '357241', 0),
(29, 'jlborges', 'Jorge Luis', 'Borges', 'jlborges@datawarehouse.com', '159487', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `canales`
--
ALTER TABLE `canales`
  ADD PRIMARY KEY (`id_canales_preferidos`);

--
-- Indices de la tabla `canal_preferencia`
--
ALTER TABLE `canal_preferencia`
  ADD PRIMARY KEY (`id_canal_preferencia`);

--
-- Indices de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD PRIMARY KEY (`id_ciudades`),
  ADD KEY `pais_id_` (`pais_id`);

--
-- Indices de la tabla `companias`
--
ALTER TABLE `companias`
  ADD PRIMARY KEY (`id_compania`),
  ADD KEY `id_ciudades_comp` (`id_ciudades_companias`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contactos`),
  ADD KEY `id_companias` (`id_compania`),
  ADD KEY `id_pais` (`id_pais`),
  ADD KEY `id_region` (`id_region`);

--
-- Indices de la tabla `contactos_canales`
--
ALTER TABLE `contactos_canales`
  ADD PRIMARY KEY (`id_canales_contactos`),
  ADD KEY `contactos_id` (`id_contactos`),
  ADD KEY `canales_id` (`id_canales`);

--
-- Indices de la tabla `paises`
--
ALTER TABLE `paises`
  ADD PRIMARY KEY (`id_paises`),
  ADD KEY `region_id_` (`region_id`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id_regiones`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `canales`
--
ALTER TABLE `canales`
  MODIFY `id_canales_preferidos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `canal_preferencia`
--
ALTER TABLE `canal_preferencia`
  MODIFY `id_canal_preferencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ciudades`
--
ALTER TABLE `ciudades`
  MODIFY `id_ciudades` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `companias`
--
ALTER TABLE `companias`
  MODIFY `id_compania` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contactos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `contactos_canales`
--
ALTER TABLE `contactos_canales`
  MODIFY `id_canales_contactos` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT de la tabla `paises`
--
ALTER TABLE `paises`
  MODIFY `id_paises` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id_regiones` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ciudades`
--
ALTER TABLE `ciudades`
  ADD CONSTRAINT `pais_id_` FOREIGN KEY (`pais_id`) REFERENCES `paises` (`id_paises`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `companias`
--
ALTER TABLE `companias`
  ADD CONSTRAINT `id_ciudades_comp` FOREIGN KEY (`id_ciudades_companias`) REFERENCES `ciudades` (`id_ciudades`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD CONSTRAINT `id_companias` FOREIGN KEY (`id_compania`) REFERENCES `companias` (`id_compania`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_pais` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_paises`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contactos_canales`
--
ALTER TABLE `contactos_canales`
  ADD CONSTRAINT `canales_id` FOREIGN KEY (`id_canales`) REFERENCES `canales` (`id_canales_preferidos`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contactos_id` FOREIGN KEY (`id_contactos`) REFERENCES `contactos` (`id_contactos`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paises`
--
ALTER TABLE `paises`
  ADD CONSTRAINT `region_id_` FOREIGN KEY (`region_id`) REFERENCES `regiones` (`id_regiones`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
