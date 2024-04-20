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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='vacation users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'Danny','Kushmaro','dannyk@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',1),(14,'yonit','levy','yonitl@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(15,'moshe','levy2','moshel2@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(16,'nana ','banana','nana@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(37,'jjjl','7jjjj','reggiem@gmail.co','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2),(38,'john','stockton','johns@gmail.com','38c4b898249f7a8bd6bb0495dc7e52040c968888a32eaf621eefd9f378a03329c99d2ae0a708da5743679908d3b295e6633ba746bc3c4a5ade468bbf880a255b',2);
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
  `description` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `imageName` varchar(55) DEFAULT NULL,
  `totalLikesCount` int DEFAULT '0',
  `isLikedByCurrentUser` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Athens','In Athens you get the best of both worlds: a modern city with old-world charm and the natural beauty of Greece just beyond. Once the center of ancient civilization, Athens has so much history to discover—from ruins to still-intact treasures','2024-03-01','2024-04-20',4067.00,'83d0ddc2-02f8-421e-881b-3aead8836b43.jpg',2,0),(2,'Budapest','Over 15 million gallons of water bubble into Budapest\'s 118 springs and boreholes every day. That number points to the astounding array of baths in this city, from the sparkling Gellert Baths to the vast 1913 neo-baroque Szechenyi Spa to Rudas Spa, a dramatic 16th-century Turkish pool with original Ottoman architecture. The \"Queen of the Danube\" is also steeped in history, culture, and natural beauty.','2024-04-02','2024-04-26',337.00,'84cf19ee-d0f2-4c3f-bb1d-7c4c685574ea.jpg',0,0),(3,'Amsterdam','From its picturesque canals and bridges to its historic homes, Amsterdam could be considered straight out of a fairytale (and the brightly-colored bicycles and tulip stands around town don’t hurt either). Must-see sights include the Anne Frank House, the Van Gogh Museum, and the world\'s only floating flower market. Rent a bike and join thousands of locals peddling around.','2024-04-01','2024-04-20',639.00,'3e8c550c-f875-4401-99c6-8bead4e4f872.jpg',1,0),(4,'Tokyo','With its futuristic skyscrapers, unrivaled food scene, and wild nightlife, Tokyo is a rush of pure adrenaline. The city is famously cutting-edge, yet its ancient Buddhist temples, vintage teahouses, and peaceful gardens offer a serene escape—and a reminder of its past.','2024-04-01','2024-04-20',1256.00,'b982123d-d635-4666-9cf9-955b8050209c.jpg',1,0),(5,'Brazil','The wealth of flora and fauna and opportunities to observe them are unparalleled in the Amazon. Riverboats ply the waters of this fascinating wilderness, home to pink river dolphins, clamorous howler monkeys and raucous toucans. ','2024-03-01','2024-03-11',1501.00,'7f01b500-4da6-4ec8-9261-1c93dfb865cc.jpg',1,0),(6,'Spain','From sun-drenched archipelagos and bustling urban cities to snowcapped mountains and semi-arid deserts, Spain epitomizes geographical diversity. As the meeting point of the Atlantic Ocean and Mediterranean Sea, this vast country offers some of Europe’s most dramatic landscapes, as well as some of its tastiest cuisine.','2024-04-01','2024-04-20',650.00,'f39a4534-9511-46e7-bdc5-6b51a9baf6d2.jpg',1,0),(7,'Jamaica','Is there anything better than swaying from a hammock in a warm patch of Jamaican sun? If you\'re seeking laid-back vibes, you\'ve come to the right place. But Jamaica offers plenty of outdoor adventure for those that want it, too. Consider diving into Blue Hole, rafting on Martha Brae River, even bobsledding down Mystic Mountain.','2024-04-01','2024-04-20',1256.00,'74a199b3-c707-4b31-84e0-af363fda2a33.jpg',0,0),(8,'Maldives','With 26 atolls and 1,000+ islands spread out across the idyllic waters of the Indian Ocean, the Maldives are an island-hopper’s dream. Below the water, there’s miles of coral reef that are home to thousands of species of marine life and underwater treasures. To get the best of it: Go diving at Broken Rock, snorkel with manta rays in Hanifaru Bay, or charter a boat to hit all the top spots.','2024-05-01','2024-06-20',2750.00,'b567b435-88aa-4b1d-bef5-f57356940579.jpg',1,0),(9,'Chile','Make the most of three days in Santiago, Chile, from the best restaurants and art museums to surrounding vineyards and hikes in the Andes.','2024-05-01','2024-06-20',3000.00,'a397fb16-e02c-4694-b852-da9f08e0278d.jpg',0,0),(11,'France','There\'s much more to France than Paris—from the fairy-tale châteaux of the Loire Valley to the lavender fields of Provence, and the French Riviera\'s celebrity-studded beaches. World-famous gastronomy and fine wines provide the perfect complement to the country\'s alpine views and architectural masterpieces.','2024-05-01','2024-05-15',750.00,'7d9c9943-8682-40fa-97c9-511b9bb97c65.jpg',0,0),(12,'Belgium','From canal-laced, fairy-tale cities like Bruges and Ghent to the urban centers of Antwerp and Brussels, Belgium sits at the crossroads of medieval and modern Europe. The chance to sample famous exports such as chocolate and beer straight from the source only sweetens a visit.','2024-06-01','2024-07-01',850.00,'cf340316-ee9b-4835-b73d-f6cd01c32ace.jpg',0,0),(15,'Tanzania','Tanzania is the place to be for those who love travel and adventure. This beautiful East African country, which borders the Indian Ocean, has something for everyone. Large cities and untouched landscapes means you don’t need to leave this sunny oasis to fulfill your vacation desires.','2024-04-01','2024-05-01',655.00,'63af1015-a75a-44db-9a9f-82a4acc6e457.jpg',0,0),(22,'Turkey','From Cappadocia’s otherworldly rock formations to the turquoise waters of the Mediterranean coastline, Türkiye’s landscapes are as rich and varied as the abundant adventures you’ll find in them. Experience the ancient empires that have left their mark in world-famous ruins; immerse yourself in blockbuster scenery by sea, land and air; and feast on world-class gastronomy, celebrating the best of its regional bounty.','2024-04-01','2024-04-02',888.00,'c19b60aa-5645-4fbd-bbe2-1d86f0923e32.jpg',0,0),(23,'Croatia','Croatia makes quite a splash. With Grade 3 and 4 rafting and kayaking available on rivers that gush through lush forest, and sea kayaking on the coast, it\'s the perfect place to paddle. For a different pace, dive into the Adriatic\'s graveyard of vessels, clamber limestone cliffs or sail between 1200 islands.','2024-04-01','2024-04-02',680.00,'c047eb44-7538-4572-ba02-387e4acc0470.avif',0,0),(24,'Switzerland','Tiny, multilingual Switzerland packs a lot into its landlocked borders: glittering lakes, sky-high peaks, postcard-perfect villages, world-class museums. Get a taste of it all with the Grand Tour, a 1,000-mile route that takes you to the medieval old city of Bern, towering Jungfraujoch, the iconic Matterhorn, and 42 other must-sees.','2024-04-01','2024-04-16',750.00,'43633eae-0858-420d-8a0b-9cf4712efbc1.jpg',0,0);
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

-- Dump completed on 2024-04-20 20:39:31
