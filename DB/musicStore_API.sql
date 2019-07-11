-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 11, 2019 at 01:24 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.3.6-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musicStore_API`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE `album` (
  `id` int(11) NOT NULL,
  `artists_id` int(11) DEFAULT NULL,
  `types_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `album`
--

INSERT INTO `album` (`id`, `artists_id`, `types_id`, `name`, `image_name`, `published_at`, `price`) VALUES
(15, 1, 1, 'Get Behind Me Satan', 'getbehindmesatan.jpg', '2019-06-25 13:49:25', 10.99),
(16, 3, 1, 'Let It Bleed', 'letitbleed.jpg', '2019-06-25 13:50:18', 12.99),
(17, 7, 1, 'Mellon Collie And The Infinite Sadness', 'melloncollie.jpg', '2019-06-25 13:51:11', 1),
(18, 4, 1, 'Achtung Baby', 'achtungbaby.jpg', '2019-06-25 13:51:47', 14.99),
(19, 12, 1, 'London Callin', 'londoncalling.jpg', '2019-06-25 13:52:28', 10.99),
(20, 8, 1, 'Bossonova', 'bossanova.jpg', '2019-06-25 13:53:24', 9.99),
(21, 5, 1, 'Definitely Maybe', 'definitelymaybe.jpg', '2019-06-25 13:54:16', 16.99),
(22, 6, 1, 'Pacific Ocean Blue', 'pacificoceanblue.jpg', '2019-06-25 13:54:57', 10.99),
(23, 9, 1, 'The Beatles (White Album)', 'thebeatles.jpg', '2019-06-25 13:55:34', 11.99),
(24, 10, 1, 'Nebraska', 'nebraska.jpg', '2019-06-25 13:56:11', 12.99),
(25, 11, 1, 'Ziggy Stardust', 'ziggystardust.jpg', '2019-06-25 13:57:51', 14.99);

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`id`, `name`) VALUES
(1, 'The White Stripes'),
(3, 'The Rolling Stones'),
(4, 'U2'),
(5, 'Oasis'),
(6, 'Dennis Wilson'),
(7, 'The Smashing Pumpkins'),
(8, 'Pixies'),
(9, 'The Beatles'),
(10, 'Bruce Springsteen'),
(11, 'David Bowie'),
(12, 'The Clash');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `album_id`, `content`, `date`) VALUES
(2, 26, 15, 'hello world!', '2019-07-08 16:07:29'),
(3, 26, 15, 'c\'est bon, je crois :-)', '2019-07-08 16:56:03'),
(4, 26, 15, 'coucou hello', '2019-07-09 11:03:23'),
(5, 26, 22, 'tcheu dit, quelle barbe il a', '2019-07-10 07:24:15'),
(6, 26, 22, 'Pacific Ocean Blue', '2019-07-10 07:24:34'),
(7, 26, 21, 'Super groupe de rock :-)', '2019-07-10 07:42:53'),
(8, 26, 20, 'where is my mind', '2019-07-10 07:43:19'),
(9, 26, 20, 'c\'est le son que l\'on entend dans fight club', '2019-07-10 07:44:12'),
(10, 26, 16, 'The Rolling Stones', '2019-07-10 10:29:35'),
(13, 26, 25, 'Hey, mais c\'est une blague ou quoi ?', '2019-07-10 13:11:26'),
(14, 26, 25, 'han ouais !', '2019-07-10 13:11:40');

-- --------------------------------------------------------

--
-- Table structure for table `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Pop/Rock'),
(2, 'Classique'),
(3, 'Blues'),
(4, 'R&B'),
(5, 'Rap'),
(6, 'Reggae'),
(7, 'Electro'),
(8, 'Country'),
(10, 'Folk'),
(11, 'Drum and bass'),
(12, 'Abstract hip hop');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int(11) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `first_name`, `address`, `number`, `postal_code`, `city`, `email`, `password`, `roles`, `api_token`) VALUES
(26, 'De pneu', 'Marc', 'rue du chmod', 777, 1000, 'Linux', 'marc@gmail.com', '$2y$13$OLw5rZHqFWgLBBhrNJ2LSuUJifmLvUvZYcX4ZYludjra3XGcaaOo.', 'ROLE_USER', 'd8dd3a1496a2b3fd390de78666b99e3b73ad8e33'),
(27, 'Vederchi', 'Harry', 'rue du chmod', 777, 1000, 'Linux', 'harry@gmail.com', '$2y$13$6SbsZt9Ik6IFvWCZm.S.u.ByaYbo1g2.wEqIAACcEhHSpvGMJnrMS', 'ROLE_ADMIN', '932e7fe69da1222c2041d581c62f7be0c41367b9'),
(30, 'De pneu', 'Mélusinne', 'rue de la Banqueroute', 12, 1200, 'Linux', 'melusinne@gmail.com', '$2y$13$/At27oV7QY74aPl5Vo327.6CZVY1qIX4jS0t48pH8JXqxzGnDBnmy', 'ROLE_USER', '8afaf4cc69e17084e649c508498d97e560025e44'),
(31, 'Proute', 'Peter', 'rue de l\'usine à gaz', 13, 1300, 'Poivre', 'peter@gmail.com', '$2y$13$wgPz.QP7/rZswEof5bg89.iTCf2hhLnvpwIsl1pJIEzxDrpmsM4QC', 'ROLE_USER', '77b3339efad32a8ba7fa09acc1a07c161a8df6da'),
(32, 'Ramenepas', 'Lara', 'rue du carctère', 1, 1000, 'Bruxelles', 'lara@gmail.com', '$2y$13$kelgKqtHU8p4IRWnN.Dp3.0xNCc2xiXepH9Pa/.u4ojIM7ck65lCC', 'ROLE_ADMIN', '442736a03fcba01dc74459eba4e9593a1e5f321f');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_39986E4354A05007` (`artists_id`),
  ADD KEY `IDX_39986E438EB23357` (`types_id`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9474526CA76ED395` (`user_id`),
  ADD KEY `IDX_9474526C1137ABCF` (`album_id`);

--
-- Indexes for table `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FK_39986E4354A05007` FOREIGN KEY (`artists_id`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `FK_39986E438EB23357` FOREIGN KEY (`types_id`) REFERENCES `type` (`id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FK_9474526C1137ABCF` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `FK_9474526CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
