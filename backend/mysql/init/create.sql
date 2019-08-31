DROP DATABASE IF EXISTS app_database;
CREATE DATABASE app_database;

USE app_database;

DROP TABLE IF EXISTS account_users;

CREATE TABLE account_users (
 `id` INT(20) AUTO_INCREMENT,
 `email` VARCHAR(20) NOT NULL,
 `password` VARCHAR(256) NOT NULL,
 `created_at` Datetime DEFAULT CURRENT_TIMESTAMP,
 `updated_at` Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

DROP TABLE IF EXISTS reservations;

CREATE TABLE reservations (
  `id` INT(20) AUTO_INCREMENT,
  `status` VARCHAR(20) NOT NULL ,
  `name` VARCHAR(20) NOT NULL ,
  `store_id` INT(20) NOT NULL ,
  `store_name` VARCHAR(20) NOT NULL ,
  `num` INT(20) NOT NULL ,
  `visit_time` Datetime NULL,
  `created_at` Datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  `delete_flag` boolean DEFAULT 0,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

DROP TABLE IF EXISTS stores;

CREATE TABLE stores (
  `id` INT(20) AUTO_INCREMENT,
  `store_id` INT(20) NOT NULL ,
  `store_name` VARCHAR(20) NOT NULL ,
  `created_at` Datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` Datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
