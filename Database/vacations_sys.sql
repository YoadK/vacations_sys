CREATE DATABASE  IF NOT EXISTS `vacations_sys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations_sys`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations_sys
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  KEY `Likes-users_FK_idx` (`userId`),
  KEY `Likes-vacations_FK_idx` (`vacationId`),
  CONSTRAINT `Likes-users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Likes-vacations_FK` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='connection table between users and their likes (vacation likes)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (16,8),(16,5),(16,3),(16,6),(16,1),(14,1),(14,4);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='vacation users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'Danny','Kushmaro','dannyk@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',1),(14,'yonit','levy','yonitl@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(15,'moshe','levy2','moshel2@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(16,'nana ','banana','nana@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(17,'fdsg','fdsg','gk@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(75) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `imageName` varchar(55) DEFAULT NULL,
  `totalLikesCount` int DEFAULT '0',
  `isLikedByCurrentUser` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Athens','a nice place to visit','2024-03-01','2024-04-20',467.00,'fb0822e9-0a2f-4336-8fb8-400770196e46.jpg',2,0),(2,'Budapest','another nice place to visit','2024-04-01','2024-04-20',337.00,'84cf19ee-d0f2-4c3f-bb1d-7c4c685574ea.jpg',0,0),(3,'Amsterdam','a nice place for stoners','2024-04-01','2024-04-20',639.00,'3e8c550c-f875-4401-99c6-8bead4e4f872.jpg',1,0),(4,'Tokyo','flight only','2024-04-01','2024-04-20',1256.00,'b982123d-d635-4666-9cf9-955b8050209c.jpg',1,0),(5,'Brazil','like churros? best place to eat them','2024-07-01','2024-07-10',1501.00,'7f01b500-4da6-4ec8-9261-1c93dfb865cc.jpg',1,0),(6,'Spain','marvelous views, beautiful churches and old buildings','2024-04-01','2024-04-20',650.00,'f39a4534-9511-46e7-bdc5-6b51a9baf6d2.jpg',1,0),(7,'Jamaica','flight only','2024-04-01','2024-04-20',1256.00,'74a199b3-c707-4b31-84e0-af363fda2a33.jpg',0,0),(8,'Maldives','a beautiful location to visit!','2024-05-01','2024-06-20',2750.00,'b567b435-88aa-4b1d-bef5-f57356940579.jpg',1,0),(9,'Chile','also a beautiful location to visit!','2024-05-01','2024-06-20',3000.00,'a397fb16-e02c-4694-b852-da9f08e0278d.jpg',0,0),(11,'France','the baguette country!','2024-05-01','2024-05-15',750.00,'7d9c9943-8682-40fa-97c9-511b9bb97c65.jpg',0,0),(12,'Belgium','Belgium is world-famous for its chocolate, waffles, and beer.','2024-06-01','2024-07-01',850.00,'cf340316-ee9b-4835-b73d-f6cd01c32ace.jpg',0,0),(15,'Tanzania','a nice place to visit','2024-04-01','2024-05-01',655.00,'63af1015-a75a-44db-9a9f-82a4acc6e457.jpg',0,0),(22,'Turkey','a nice place to visit','2024-04-01','2024-04-02',888.00,'c19b60aa-5645-4fbd-bbe2-1d86f0923e32.jpg',0,0),(23,'Croatia','a nice place to visit','2024-04-01','2024-04-02',680.00,'c047eb44-7538-4572-ba02-387e4acc0470.avif',0,0),(24,'Switzerland','a nice place to visit','2024-04-01','2024-04-16',750.00,'43633eae-0858-420d-8a0b-9cf4712efbc1.jpg',0,0);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 10:35:04
