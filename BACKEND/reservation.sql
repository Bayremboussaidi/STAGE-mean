-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : ven. 23 fév. 2024 à 10:42
-- Version du serveur : 10.4.25-MariaDB
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `reservation`
--

-- --------------------------------------------------------

--
-- Structure de la table `plat`
--

CREATE TABLE `plat` (
  `idPlat` int(11) NOT NULL,
  `nomPlat` varchar(250) NOT NULL,
  `datePlat` date NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `plat`
--

INSERT INTO `plat` (`idPlat`, `nomPlat`, `datePlat`, `idUser`) VALUES
(2, 'scalope', '2024-02-05', 1);

-- --------------------------------------------------------

--
-- Structure de la table `transport`
--

CREATE TABLE `transport` (
  `idTransport` int(11) NOT NULL,
  `matricule` int(11) NOT NULL,
  `adresseDestination` varchar(250) NOT NULL,
  `dateSortie` date NOT NULL,
  `heureSortie` time NOT NULL,
  `dateDeDepart` date NOT NULL,
  `heureDeDepart` time NOT NULL,
  `logs` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(30) NOT NULL,
  `idUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `transport`
--

INSERT INTO `transport` (`idTransport`, `matricule`, `adresseDestination`, `dateSortie`, `heureSortie`, `dateDeDepart`, `heureDeDepart`, `logs`, `status`, `idUser`) VALUES
(2, 12345, 'soukra', '2024-01-09', '08:32:17', '2024-01-24', '08:32:17', '2024-02-01 15:04:12', 'true', 1),
(6, 12345, 'l\'aouina', '2024-02-13', '14:36:44', '2024-02-13', '09:36:44', '2024-02-01 15:04:12', '1', 1),
(7, 123450, 'lac', '2024-02-07', '07:55:31', '2024-02-06', '08:55:31', '2024-02-01 15:04:12', 'true', 1),
(8, 123, 'soukra', '2024-01-08', '08:32:17', '2024-01-23', '08:32:17', '2024-02-01 15:04:12', '', 1),
(9, 1200, 'soukra', '2024-01-08', '08:32:17', '2024-01-23', '08:32:17', '2024-02-01 15:04:28', '', 1),
(10, 123456, 'soukra', '2024-01-09', '08:32:17', '2024-01-24', '08:32:17', '2024-02-09 14:13:41', '', 1),
(23, 123411, 'aouina', '2024-01-09', '08:32:17', '2024-01-24', '08:32:17', '2024-02-22 11:35:22', 'true', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `idUser` int(250) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `dateNaissance` date NOT NULL,
  `numTel` int(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `mot_de_passe` varchar(250) NOT NULL,
  `role` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `nom`, `prenom`, `dateNaissance`, `numTel`, `email`, `mot_de_passe`, `role`) VALUES
(1, 'raisi', 'rajé', '1998-09-10', 53692011, 'Rajaraissi@gmail.com', '1234', 'admin'),
(3, 'raissi', 'ala', '1998-09-09', 53692011, 'ala@gmail.com', '$2b$10$x7x8S633fy.ebi/CV7cfPenfbbBTem/smEqeqf0LREIzR9UVFhq82', 'prospect'),
(4, 'raisi', 'admin', '1998-09-09', 53692011, 'admin@gmail.com', '$2b$10$gv7cjPKz4OaFTIYwJpxkTu2La56vWTr3ficrtT.qxkN0jeE/bmVgK', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `plat`
--
ALTER TABLE `plat`
  ADD PRIMARY KEY (`idPlat`),
  ADD KEY `fk_dp_plat` (`idUser`);

--
-- Index pour la table `transport`
--
ALTER TABLE `transport`
  ADD PRIMARY KEY (`idTransport`),
  ADD KEY `fk_dp_user` (`idUser`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `plat`
--
ALTER TABLE `plat`
  MODIFY `idPlat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `transport`
--
ALTER TABLE `transport`
  MODIFY `idTransport` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `plat`
--
ALTER TABLE `plat`
  ADD CONSTRAINT `fk_dp_plat` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);

--
-- Contraintes pour la table `transport`
--
ALTER TABLE `transport`
  ADD CONSTRAINT `fk_dp_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
