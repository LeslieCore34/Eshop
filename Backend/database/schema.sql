-- Active: 1699865965442@@127.0.0.1@3306@outfit

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL, 
  `postcode` VARCHAR(20) NOT NULL,
  `city` VARCHAR(100) NOT NULL,  
  `telephone` VARCHAR(20) NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table des détails de commande
CREATE TABLE IF NOT EXISTS `order_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `order_date` TIMESTAMP NOT NULL,  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_order_details` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,     
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `title` VARCHAR(200) NOT NULL,  
  `unit_price` DECIMAL(10, 2) NOT NULL,
  `description` VARCHAR(200) NOT NULL, 
  `image` VARCHAR(250) NOT NULL,  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_category_product` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `product` 
	CHANGE `category_id` `category_id` int NOT NULL ;

INSERT INTO `category` (`title`) VALUES
('men'),
('women');

INSERT INTO `product` VALUES
(1, 1, 'T-Shirt Casual', '22.3', 'Style ajusté, manches longues raglan contrastées, patte de boutonnage henley à trois boutons, tissu léger et doux pour un port respirant et confortable.', 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'),
(2, 1, 'Veste Homme Cotton', '55.99', 'Superbes vestes d\'extérieur pour le printemps, l\'automne et l\'hiver, adaptées à de nombreuses occasions.', 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'),
(3, 1, 'T-Shirt Manche Longue', '15.99', 'T-Shirt en cotton ajusté. Col en V et manches longues.', 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'),
(4, 1, 'Ensemble Sportswear', '35.99', 'Ensemble sport décontracté.', 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_a_neatly_arranged_photo_of_mens_clothes_t-shirt_gray_hoodie__c5a4ebe4-ccb1-4d94-ae56-a1b33b4e71d9_1.png?v=1675456349'),
(5, 1, 'Ensemble Sportswear', '55.99', 'Ensemble blanc cotton.', 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_a_neatly_arranged_photo_of_mens_clothes_t-shirt_gray_hoodie__c5a4ebe4-ccb1-4d94-ae56-a1b33b4e71d9_1.png?v=1675456349'),
(6, 1, 'Trio baskets courses à pied', '99.99', 'Baskets running, 3 paires.', 'https://cdn.shopify.com/s/files/1/0688/1755/1382/collections/cd_three_pairs_of_neatly_arranged_men_and_womens_running_shoes._f4121e54-2c8a-4ad2-b366-355c0cc4348d_1.png?v=1675461870'),
(7, 2, 'Veste de ski', '56.99', 'Idéal pour les activités hivernales, veste imperméable et respirante.', 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'),
(8, 2, 'Veste en cuir', '105.00', 'Veste en cuir ajustée.', 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg'),
(9, 2, 'Parka bleu nuit', '85.00', 'Parka bleue imperméable et résistante.', 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg');

