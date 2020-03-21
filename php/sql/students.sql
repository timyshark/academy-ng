-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 21, 2020 at 05:40 AM
-- Server version: 8.0.19
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `academy`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `sId` int NOT NULL,
  `fName` varchar(255) NOT NULL,
  `picturePath` varchar(255) NOT NULL,
  `sEmail` varchar(255) NOT NULL,
  `sGender` char(1) NOT NULL,
  `sStatus` tinyint NOT NULL,
  `school` varchar(5) NOT NULL,
  `sDOB` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`sId`, `fName`, `picturePath`, `sEmail`, `sGender`, `sStatus`, `school`, `sDOB`) VALUES
(1, 'Mark', 'assets/images/mark.png', 'mark1@andrea.com', 'M', 0, 'UBC', '2020-03-21'),
(2, 'John', 'assets/images/john.png', 'john@flamingo.com', 'M', 0, 'SFU', NULL),
(3, 'Mary', 'assets/images/mary.png', 'mary01@goblin.com', 'F', 0, 'UBC', '2003-05-20'),
(4, 'Tim Shark', '/assets/images/mark.png', 'tim.a.hass@outlook.com', 'M', 1, 'SFU', '2014-08-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`sId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `sId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
