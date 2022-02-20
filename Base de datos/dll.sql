-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: hackablock
-- ------------------------------------------------------
-- Server version	5.7.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cursos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `parrafo_1` varchar(200) DEFAULT NULL,
  `parrafo_2` varchar(200) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `id_tutor` int(11) DEFAULT NULL,
  `valoracion` int(11) DEFAULT NULL,
  `nivel` varchar(10) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `n_visitas` int(11) DEFAULT NULL,
  `categoria_blockchain` int(10) unsigned DEFAULT NULL,
  `categoria_bitcoin` int(10) unsigned DEFAULT NULL,
  `categoria_crypto` int(10) unsigned DEFAULT NULL,
  `categoria_ethereum` int(10) unsigned DEFAULT NULL,
  `categoria_hyperledger` int(10) unsigned DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `tutor` varchar(45) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `valor` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Introducción a Blockchain.',180,32,'Blockchain1','Blockchain2','introducion-a-blockchain.jpeg',1,3,'Básico','2021-05-03',62,1,NULL,NULL,NULL,NULL,NULL,'Juan Perez','juan-perez.png','45','gratis','blockchain'),(2,'Fundamentos del Blockchain.',200,19,'Bitcoin1','Bitcoin2','fundamentos-del-blockchain.jpeg',2,5,'Intermedio','2021-05-06',45,1,NULL,NULL,NULL,NULL,NULL,'Cristian Anastacio','cristian-anastacio.jpeg','39','gratis','blockchain'),(3,'Historia del Blockchain.',220,40,'Cripto1','Cripto2','historia-del-blockchain.jpeg',3,2,'Avanzado','2021-05-09',36,1,NULL,NULL,NULL,NULL,NULL,'Esteban Ortega','esteban-ortega.jpeg','26','pago','blockchain'),(4,'Criptomonedas, crypto',132,36,'0',NULL,'criptomonedas-dogcoin.jpeg',4,5,'Básico','2020-03-18',265,NULL,1,1,1,1,NULL,'Miguel Isaías','miguel-isaias.jpeg','12','pago','bitcoin'),(5,'Blockchain Estrategias',45,38,NULL,NULL,'blockchain-10.jpg',5,3,'Básico','2020-03-14',67,1,NULL,NULL,1,NULL,NULL,'Melissa Brown','melissa-brown.jpg','26','gratis','blockchain'),(6,'Invierte en Hyperledger',NULL,62,'0',NULL,'invierte-en-hyperledger.jpeg',6,4,'Intermedio','2020-02-25',85,NULL,NULL,NULL,NULL,1,NULL,'Jhonny Lee','jhonny-lee.jpeg','21','pago','hyperledger'),(7,'Ethereum y Escalabilidad',NULL,47,'0',NULL,'ethereum-y-escalabilidad.jpeg',7,4,NULL,'2020-12-18',30,1,NULL,NULL,1,NULL,NULL,'Elizabeth Merino','elizabeth-merino.jpeg','52','pago','ethereum'),(8,'Dogcoin, fake o realidad?',123,67,NULL,NULL,'dogcoin.jpg',4,4,'Básico','2021-08-07',121,NULL,1,1,NULL,1,NULL,'Miguel Isaías','miguel-isaias.jpeg','5','gratis','crypto'),(9,'NFT, ¿Qué es?',32,43,NULL,NULL,'nft.jpg',9,5,'Avanzado','2020-09-08',138,1,NULL,NULL,1,NULL,NULL,'Issac Calderon','issac-calderon.jpg','95','pago','blockchain');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `biografia` varchar(500) DEFAULT NULL,
  `sitio_web` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `facebok` varchar(100) DEFAULT NULL,
  `linkedin` varchar(100) DEFAULT NULL,
  `youtube` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `tutor` int(11) DEFAULT NULL,
  `admin` int(11) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `valoracion` int(11) DEFAULT NULL,
  `paypal` varchar(30) DEFAULT NULL,
  `categoria_blockchain` int(11) DEFAULT NULL,
  `categoria_bitcoin` int(11) DEFAULT NULL,
  `categoria_cripto` int(11) DEFAULT NULL,
  `categoria_ethereum` int(11) DEFAULT NULL,
  `categoria_hyperledger` int(11) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'student',
  `imagen` varchar(45) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `codigo_postal` int(11) DEFAULT NULL,
  `profesion` varchar(45) DEFAULT NULL,
  `masterado` varchar(45) DEFAULT NULL,
  `doctorado` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `clases` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Ana María','Costas','ana@gmail.com','$2a$10$DUDs/xjj7GuP4AzgxQb.0epjZHf1APqZipHdTMJER9Pz0qe.i11BO','ana-maria-costas.jpeg','The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.  but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',NULL,NULL,NULL,NULL,NULL,'anamariaavatar.jpg','España',1,NULL,NULL,NULL,NULL,25,4,NULL,NULL,NULL,NULL,NULL,NULL,'tutor',NULL,NULL,'Madrid',NULL,NULL,'Experta en Blockchain',NULL,NULL,'Blockchain','22'),(2,'Arthuro','Vidal','arthuro@yahoo.es','$2a$10$VP/nMb9ramtlsQvoASjr9OalB3FCf3ig1ezXDePuJLySQ5vq29m5a','arthuro-vidal.jpeg','If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',NULL,NULL,NULL,NULL,NULL,'avatardefault.png','Ecuador',1,NULL,NULL,NULL,NULL,48,5,NULL,NULL,NULL,NULL,NULL,NULL,'tutor',NULL,NULL,'Bilbao',NULL,NULL,'Inversor en Criptomonedas',NULL,NULL,'Crypto','31'),(3,'Balani','Mouldad','balani@hotmail.com','$2a$10$k8y8BtAE0uVXfNWB6S18Lu8UHfLv7LoqYoeFx4cbTsR0LAea07tLi','balani-mouldad.jpg',' It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',NULL,NULL,NULL,NULL,NULL,'avatardefault.png','Venezuela',1,NULL,NULL,NULL,NULL,55,3,NULL,NULL,NULL,NULL,NULL,NULL,'tutor',NULL,NULL,'Valencia',NULL,NULL,'Analista Big Data',NULL,NULL,'Ethereum','34'),(4,'Ernesto','Pomo','ernesto@gmail.com','$2a$10$XLnfxR6USvH8YhIJDL4x9OOcsI0fdd67lWGEMrbpo5fWv1YVFwATC','ernesto-pomo.jpeg','Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',NULL,NULL,NULL,NULL,NULL,'avatardefault.png','USA',1,NULL,NULL,NULL,NULL,29,5,NULL,NULL,NULL,NULL,NULL,NULL,'tutor',NULL,NULL,'Vigo',NULL,NULL,'Agile Coach',NULL,NULL,'Bitcoin','12'),(5,'Lucía','Jimenez','lucia@yahoo.com','$2a$10$dITMedopcMtQCRXkM4PiFui2Gy/yssBQofwsr4jzGEFJ7fL.hXVK2','lucia-jimenez.jpeg','Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.',NULL,NULL,NULL,NULL,NULL,'avatardefault.png','Costa Rica',1,NULL,NULL,NULL,NULL,70,4,NULL,NULL,NULL,NULL,NULL,NULL,'tutor',NULL,NULL,'A Coruña',NULL,NULL,'Científica de Datos',NULL,NULL,'Ethereum','52'),(6,'Vicente','Taiano','vicente@hotmail.es','$2a$10$WynpHt.I6wRlBMlEgCYOmeyzs619HcxLXERaVDBSLb1uZZ1/iDMnC','vicente-taiano.jpg','It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',NULL,NULL,NULL,NULL,NULL,'avatardefault.png','México',1,NULL,NULL,NULL,NULL,36,2,NULL,NULL,NULL,NULL,NULL,NULL,'tutor',NULL,NULL,'Salamanca',NULL,NULL,'Desarrollador de Salesforce',NULL,NULL,'Blockchain','37');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-06 14:18:36
