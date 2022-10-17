-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-10-2022 a las 00:19:24
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_adm_pres`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type` enum('entry',' egress') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `type`) VALUES
(1, 'Comida', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operations`
--

CREATE TABLE `operations` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `concept` varchar(50) NOT NULL,
  `amount` float NOT NULL,
  `date` datetime NOT NULL,
  `type` enum('entry','egress') NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `operations`
--

INSERT INTO `operations` (`id`, `id_user`, `concept`, `amount`, `date`, `type`, `id_category`) VALUES
(2, 2, 'Candys', 12.2, '1998-06-12 03:00:00', 'egress', 1),
(8, 2, 'Extras', 5000, '2022-10-15 00:00:00', 'entry', 1),
(10, 2, 'Intereses a favor', 10.2, '2022-10-15 06:00:00', 'entry', 1),
(22, 2, 'Salario', 48000, '2022-10-15 00:00:00', 'entry', 1),
(23, 2, 'Salario en blanco', 55000, '2022-10-15 00:00:00', 'entry', 1),
(24, 2, 'Extra', 10000, '2022-10-15 00:00:00', 'entry', 1),
(25, 2, 'Alquiler ', 27000, '2022-10-15 00:00:00', 'egress', 1),
(26, 2, 'Anteojos', 850, '2022-10-15 00:00:00', 'egress', 1),
(27, 2, 'Caramelos', 500, '2022-10-15 00:00:00', 'egress', 1),
(28, 2, 'gfsdggs', 800, '2022-10-14 00:00:00', 'entry', 1),
(29, 2, 'faf gwe wf', 8000, '2022-10-15 00:00:00', 'egress', 1),
(30, 2, 'afjakfja', 5852, '2022-10-15 00:00:00', 'egress', 1),
(31, 2, 'Intereses', 20, '2022-10-16 00:00:00', 'entry', 1),
(32, 2, 'Torta', 1500, '2022-10-16 00:00:00', 'egress', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `password`) VALUES
(2, 'Santiago', 'Ortiz', 'santiagoortiz0609@hotmail.com', 'rowrowrow');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_category` (`id_category`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `operations`
--
ALTER TABLE `operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `operations`
--
ALTER TABLE `operations`
  ADD CONSTRAINT `operations_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `operations_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
