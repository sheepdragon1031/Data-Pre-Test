-- MySQL dump 10.13  Distrib 5.7.25, for macos10.14 (x86_64)
--
-- Host: localhost    Database: company
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dept`
--

DROP TABLE IF EXISTS `dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dept` (
  `id` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '部門ID',
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '部門名稱',
  `location` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1' COMMENT '部門位置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='部門';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept`
--

LOCK TABLES `dept` WRITE;
/*!40000 ALTER TABLE `dept` DISABLE KEYS */;
INSERT INTO `dept` VALUES ('A','業務發展部','四樓'),('B','數據科學部','二樓'),('C','數據工程部','二樓'),('D','系統開發部','三樓'),('E','行銷公關部','一樓'),('F','財務會計部','四樓'),('G','人事室','三樓');
/*!40000 ALTER TABLE `dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staff` (
  `staffNo` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '員工編號',
  `staffName` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '員工姓名',
  `gender` enum('M','F') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'M' COMMENT '員工性別(M:男 F:女)',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `deptId` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '部門編號',
  `status` int(1) unsigned NOT NULL DEFAULT '1' COMMENT '狀態(1:啟用 0:停用)',
  `salary` int(10) NOT NULL DEFAULT '0' COMMENT '薪資',
  PRIMARY KEY (`staffNo`),
  KEY `deptId` (`deptId`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`deptId`) REFERENCES `dept` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'Jay','M','1976-04-20','A',1,50000),(2,'Rick','M','1976-06-06','C',1,45000),(3,'David','M','2000-11-07','D',1,35000),(4,'Jake','M','1997-12-17','A',1,38000),(5,'Jenny','F','1988-12-17','C',1,40000),(6,'Cindy','F','1997-06-19','A',1,43000),(7,'Neil','M','1991-09-04','A',1,60000),(8,'Peter','M','2001-02-04','B',1,55000),(9,'Grace','F','1970-12-10','D',1,44000),(10,'Nicky','F','1999-09-09','F',1,43500),(11,'Tom','M','1987-06-15','G',1,32000),(12,'Johnson','M','1978-08-08','B',1,53000),(13,'Lulu','F','1982-08-02','E',1,51000),(14,'Steve','M','2001-02-28','E',1,48000),(15,'Tony','M','1999-10-10','F',1,30000);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-15 23:36:34
