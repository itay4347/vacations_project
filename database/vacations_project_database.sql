CREATE DATABASE  IF NOT EXISTS `vacations_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations_project`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations_project
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_vacation_followers_user_idx` (`userId`),
  KEY `FK_vacations_followers_vacation_idx` (`vacationId`),
  CONSTRAINT `FK_vacation_followers_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_vacations_followers_vacation` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (45,4,9),(47,4,7),(52,4,10),(69,4,4),(72,4,11),(99,5,56),(100,5,2),(101,5,9),(102,5,5),(103,5,7),(104,5,8),(105,6,57),(106,6,4),(107,6,5),(108,6,6),(109,6,11),(111,6,56),(112,7,57),(113,7,3),(114,7,7),(115,7,6),(116,7,8),(117,8,4),(118,8,3),(119,8,10),(120,8,5),(121,9,5),(122,9,9),(123,9,11),(124,10,56),(125,10,57),(126,10,7),(127,10,5),(128,10,11);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(130) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Homer','Simpson','homer@gmail.com','$2b$10$QXLzpZuNezXPF7NfaTPKLOu7vsqQQo/Z60x.WceuvB40c0qqhh7qy','Admin'),(4,'test1','test1','test1@gmail.com','$2b$10$iFLvTREhzmW9iYxwfZ9tB.ewAAiOn0X70SCu3RVJfkqmulgwGWaLu','User'),(5,'test2','test2','test2@gmail.com','$2b$10$fj246EhXOjmK3nKfuuErBuMNHTjrBYU.uruedviNWAEbbBM0aBdCC','User'),(6,'test3','test3','test3@gmail.com','$2b$10$fNDDV.4jgWuj6HLxWxNE4.B8lT/ja57PmQvWDYWIdIWfKK1b66hOu','User'),(7,'test4','test4','test4@gmail.com','$2b$10$ny0RIK6dDcE8Y1XeVrzQteZj3hQ1FnaaorM6e9BBov8pRVMFg.Ssu','User'),(8,'test5','test5','test5@gmail.com','$2b$10$Wn.6HOf1MMQgrMYeob.dneTbsBswOhBCUtFIUm.cqG2T2PntDC7XW','User'),(9,'test6','test6','test6@gmail.com','$2b$10$Or4/N9UYawJTIVmWqQMA5ub7Oq3mEL5sQCZ5Ayy8gTCnlExoCSW8C','User'),(10,'test7','test7','test7@gmail.com','$2b$10$t/LG/lcq3orDvEDGdieLy.25/3c6xIQhm2IJDM0O5.iI12uJcwa.e','User');
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
  `destination` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `imageName` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2,'Guatemala','Guatemala is a country of volcanoes, mountains, and beaches on the Pacific Ocean and the Caribbean Sea. From the Cuchamatán Mountains in the western highlands, to the coastlines on the Caribbean Sea and the Pacific Ocean, this small country is marked by contrasts. Three of Guatemala\'s 30 volcanoes are still active.','2023-08-10 00:00:00','2023-08-25 00:00:00',1039.00,'bcef51ff-f838-4599-abc9-490f79fe0457.jpg'),(3,'Panama','The Republic of Panama is the southernmost country in Central America. It is a former Spanish colony with a mixed population of Creoles, mestizos, European immigrants, Africans, and indigenous Indians. Panama is bordered Costa Rica to the northwest, Colombia to the south-east, the Caribbean Sea to the north and the Pacific Ocean to the south. Panama is known as a transit country because of the Panama Canal. While the country is known for its famous canal, its natural attractions include birding, whitewater rafting, and snorkeling tours. Panama’s biodiversity has been said to be three times higher than the United State, Canada and Europe combined. More than 29 percent of the country’s landscape includes 15 national parks, forest reserves and 10 wildlife sanctuaries. Panama forms a natural land bridge, connecting South and Central America. The area of the country is 25,590 square miles (74,046 square kilometers). According to the 2000 census, Panama had a population of 2.8 million people. Of these, 1 million live in and around Panama City. Panama is the most industrialized country in Central America; although it has the third largest economy after Guatemala and Costa Rica, Panama has the most developed economy and is the largest consumer of Central American countries.','2023-08-09 00:00:00','2023-08-16 00:00:00',1199.00,'575b6001-53ef-4862-a858-0a50420b1743.jpg'),(4,'Ecuador','Crammed into an area the size of the UK, Ecuador\'s habitats range from the steamy Amazon jungle and high Andean páramo, to bird filled cloud forest and mangrove lined coast, while majestic colonial cities shelter in the foothills of snow-capped volcanoes. All this before you’ve even reached the Galápagos, whose wide-eyed sea lions, giant tortoises, and penguins show no fear of their human visitors, and happily pose on wave battered rocks.','2023-08-20 00:00:00','2023-09-15 00:00:00',1499.00,'e0951238-d3f4-4820-bb7d-b520e8d48f42.jpg'),(5,'Galapagos Islands','Situated in the Pacific Ocean some 1,000 km from the South American continent, these 19 islands and the surrounding marine reserve have been called a unique ‘living museum and showcase of evolution’. Located at the confluence of three ocean currents, the Galápagos are a ‘melting pot’ of marine species. Ongoing seismic and volcanic activity reflects the processes that formed the islands. These processes, together with the extreme isolation of the islands, led to the development of unusual animal life – such as the land iguana, the giant tortoise and the many types of finch – that inspired Charles Darwin’s theory of evolution by natural selection following his visit in 1835.','2023-09-01 00:00:00','2023-09-11 00:00:00',1249.00,'54830b60-f389-4e0e-aa08-04690b61d8c5.jpg'),(6,'Japan','If you haven’t been there, just talk to someone who has. People get hooked on Japan. On their rituals, quirkiness, history and innate welcoming nature. Japan has one of the most well preserved cultures in the world with traditions such as tea ceremonies, gift giving, temple going and bathing still playing a central role today. All with a plethora of picture book backdrops: snow covered mountains, volcano lakes, coastal expanses as well as islands and forests scattered along its 3,000 kms archipelago.','2023-10-11 00:00:00','2023-10-25 00:00:00',1699.00,'f9d659d3-620f-4d78-bd14-7f096a31e57e.jpg'),(7,'Nepal','There is no question that the Himalayas offer some of the best hiking in the world and this Nepal travel guide merely scratches the surface of the picturesque and soaring peaks that have challenged adventurers for decades. The Himalayas are a special place and its villagers a special people; Nepal is not only a trekking nirvana, but a cultural beauty too. You’ll stumble across little villages where you can hang out drinking tea with the locals, welcomed with stories of myth, migration and deep religious belief. An enchanting blend of Hindu and Buddhist mysticism, Nepal is a peaceful land - there is nowhere else in the world where two religions, so often a catalyst for unrest, co-exist so comfortably.','2023-10-23 00:00:00','2023-11-15 00:00:00',1099.00,'7b97b1a5-9f73-4584-b66c-c14662342635.jpg'),(8,'Thailand','Thailand attracts travelers from around the world with its beautiful beaches, vibrant nightlife, and tasty cuisine. Bangkok is the region’s transportation hub and boasts rich tourist attractions such as the Thai royal palaces, temples, floating markets, and phenomenal street food. Chiang Mai to the north is full of ancient temples and one of the world’s best night markets. Thailand’s southern islands host several world class resorts. Phuket is great for tourists, Hua Hin is elegant, Pattaya has a vibrancy, and Ko Tao is the place for diving enthusiasts. There definitely something for everyone in Thailand.','2023-11-01 00:00:00','2023-11-21 00:00:00',1299.00,'1114eedd-98eb-4abe-9564-2a7b3bdde59e.jpg'),(9,'Cambodia','Cambodia promises a rollercoaster of emotions and experiences to both the leisure and intrepid traveller. Situated on the Indochinese peninsula, Cambodia is bordered by Thailand and Laos on the north and Vietnam on the east and south. There\'s a magic about Cambodia that casts a spell on many who visit this charming yet stunning kingdom. Your heart will race at the temple of Angkor Wat, one of the world’s greatest achievements, only to haltingly derail when faced with the impact of humankind’s darkest moments. Descend into the hell of Tuol Sleng and The Killing Fields and come face to face with the Khmer Rouge.','2023-10-10 00:00:00','2023-10-24 00:00:00',1049.00,'ceefd682-56f3-44b5-965d-7671922ac154.jpg'),(10,'Vietnam','Vietnam\'s reinvention as Southeast Asia\'s most exciting tourist destination has long since been complete. After wars for the larger part of the 20th century, the country is now a hotspot for foodies, beach bums and thrill-seekers alike. Its capital, Hanoi, has managed to retain its old-style feel despite an economic boom. Its Old Quarter is a riot of delectable food stalls, markets and labyrinthine streets. Ho Chi Minh City serves up a more modern edge, while the UNESCO-protected town of Hoi An has kept its charm despite the swathes of tourists. Vietnam\'s natural wonders, from Ha Long Bay to the Mekong Delta via the beaches of Da Nang, make it truly magical.','2023-09-04 00:00:00','2023-09-20 00:00:00',1149.00,'0c6ae0ae-608b-4b95-95e0-c22d159a3d89.jpg'),(11,'New Zealand','New Zealand (or Aotearoa – land of the long white cloud), truly is one of the most picturesque and photogenic places on earth. A small island nation of just over 4.5 million people, New Zealand is made up of two major land masses (North Island and South Island) and a number of smaller islands including Stewart Island located in the southwestern Pacific Ocean. The two main islands are divided by a 22km stretch of water called the Cook Strait.','2024-01-09 00:00:00','2024-02-01 00:00:00',2099.00,'29292a72-5edd-4f69-8a10-97d81dad1273.jpg'),(56,'peru','Peru is the beholder of the world’s largest mountain range, thousands of miles of the Amazon rainforest, a stunning coastline, some of the world’s most incredible desserts, and of course, the famous, natural world wonder, Machu Picchu. Peru shares borders with some of South America’s most fascinating countries and offers travelers plenty of things to do and see. Whether you’re interested in luxury or adventure travel, this country has something for you.','2023-08-08 00:00:00','2023-08-24 00:00:00',1500.00,'1d7cdb0f-bfd9-4808-a433-8c3e71009a29.jpg'),(57,'Philippines','With 7,107 islands, the Philippines team with potential tourist destinations. Across the islands lie pristine white beaches, warm and clear dive sites, scenic seascapes, challenging surf sites, beautiful mountains, magnificent waterfalls, hot and cold springs, and all kinds of natural jewels in a tropical setting. And because it\'s off the beaten path, the Philippines are a great place to escape the hordes that descend on other parts of Southeast Asia. First and foremost, the Philippines are a place of natural wonders – a string of coral-fringed islands strewn across a vast expanse of the western Pacific.\r\n\r\n','2023-08-25 00:00:00','2023-09-06 00:00:00',1000.00,'0b2e4768-5d07-4e35-91ad-2e6e43306bc5.jpg');
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

-- Dump completed on 2023-08-09 16:53:59
