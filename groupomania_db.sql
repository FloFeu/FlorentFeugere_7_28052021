CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentId` int unsigned NOT NULL AUTO_INCREMENT,
  `postId` int unsigned NOT NULL,
  `comment` text,
  `commentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int unsigned NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `fk_msgId_idx` (`postId`),
  KEY `fk_userId_idx` (`userId`),
  CONSTRAINT `fk_com_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE,
  CONSTRAINT `fk_posts_msgId` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (35,132,'Très bonne idée, j\'en suis !','2021-06-28 11:48:49',86),(36,133,'Je me suis inscrite ! :)','2021-06-28 11:52:04',87),(37,132,'Yes, moi de même !','2021-06-28 11:52:42',87),(38,132,'Mince je ne peux pas... :(','2021-06-28 11:53:46',83);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `postId` int unsigned NOT NULL,
  PRIMARY KEY (`like`),
  KEY `fk_users_userid_idx` (`userId`),
  KEY `fk_posts_postid_idx` (`postId`),
  CONSTRAINT `fk_likes_postid` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_userid` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (39,86,132),(40,87,133),(41,87,130),(42,87,129),(43,83,132);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postId` int unsigned NOT NULL AUTO_INCREMENT,
  `msg` text NOT NULL,
  `postDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PostAttachment` varchar(250) DEFAULT NULL,
  `userId` int unsigned NOT NULL,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `msgId_UNIQUE` (`postId`),
  KEY `fk_users_userid_idx` (`userId`),
  CONSTRAINT `fk_users_userid` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (129,'Bonjour à tous, j\'ai la chance d\'inaugurer ce réseau de partage ! ','2021-06-28 08:58:36','',83),(130,'Bonjour à tous ! ','2021-06-28 10:16:31','http://localhost:3000/images/penguin_hello.gif1624875391043.gif',84),(132,'Salut, apéro après le boulot aujourd\'hui ? ','2021-06-28 10:57:18','',85),(133,'Salut tout le monde, qui sera présent pour le week-end CE fin octobre ? ','2021-06-28 11:50:20','',86);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `bio` text,
  `isAdmin` tinyint(1) DEFAULT '0',
  `avatar` text,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (82,'Big','Brother','admin@admin.fr','$2b$12$pyMr.bqCB5tFKVFLn1sCv.mdc1ePS0LMhvVaRRDmtGVjENVYi4gke','',1,''),(83,'Jacques','Martin','jacques.martin@gmail.com','$2b$12$4rEsskQdBf3jdqx76Hda5ugfWemyG6jPb0QwJIjgHmwr74X/542pa','Comptable passionné des chiffres.',0,'http://localhost:3000/images/007-frog.png1624870664521.png'),(84,'Mirabelle','Gougeon','mirabelle.gougeon@gmail.com','$2b$12$VUiL1HuuXhQ4Da98FRropeCg1ETG79XZJ6iH30ZCkBJ.5Obtfsosi','Chargée de missions RH',0,'http://localhost:3000/images/001-cat.png1624871409676.png'),(85,'Théophile','Bilodeau','theophile.bilodeau@gmail.com','$2b$12$qQYuVuIz64SeBC35MRTIeeFJc/WjEuUrrj68ccZKYRgvaLBJd1YQ6','Administrateur réseau',0,'http://localhost:3000/images/014-koala.png1624875566461.png'),(86,'Eliott','Paraud','elliott.paraud@gmail.com','$2b$12$wKobFoYXNXg08DjNtN2naOl28TM0t45oz6DVJFBWaxTl5Mjpxpyp6','Développeur web',0,'http://localhost:3000/images/015-coyote.png1624880917285.png'),(87,'Valentine','Baillard','val_baillard@gmail.com','$2b$12$gO3ZM7W.n8ZnGZNLPXdNVe7.ORcIw06bUrbFR1gWPRG7p9TVME/zq','Assistante commerciale',0,'http://localhost:3000/images/034-parrot.png1624881105807.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-28 13:56:29
