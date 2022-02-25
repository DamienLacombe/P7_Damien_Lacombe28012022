-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `pseudo` VARCHAR(45) NULL DEFAULT NULL,
  `bio` VARCHAR(500) NULL DEFAULT NULL,
  `image_url` VARCHAR(80) NULL DEFAULT NULL,
  `admin` TINYINT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `pseudo_UNIQUE` (`pseudo` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(1500) NOT NULL,
  `image_url` VARCHAR(80) NULL DEFAULT NULL,
  `likes_count` INT NULL DEFAULT '0',
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_posts_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_posts_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(1500) NOT NULL,
  `posts_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `posts_id`, `users_id`),
  INDEX `fk_comments_posts_idx` (`posts_id` ASC) VISIBLE,
  INDEX `fk_comments_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_comments_posts`
    FOREIGN KEY (`posts_id`)
    REFERENCES `groupomania`.`posts` (`id`)
    ON DELETE RESTRICT,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `posts_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `posts_id`, `users_id`),
  INDEX `fk_likes_posts1_idx` (`posts_id` ASC) VISIBLE,
  INDEX `fk_likes_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_likes_posts1`
    FOREIGN KEY (`posts_id`)
    REFERENCES `groupomania`.`posts` (`id`),
  CONSTRAINT `fk_likes_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `groupomania`.`users` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
