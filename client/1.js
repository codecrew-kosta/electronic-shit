use new_schema;
--MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
    --Schema mydb
-- -----------------------------------------------------
    -- -----------------------------------------------------
        --Schema new_schema
-- -----------------------------------------------------

    -- -----------------------------------------------------
        --Schema new_schema
-- -----------------------------------------------------
    CREATE SCHEMA IF NOT EXISTS `new_schema` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE`new_schema`;

-- -----------------------------------------------------
    --Table`new_schema`.`dummydata`
-- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS`new_schema`.`dummydata`(
        `productNo` INT NOT NULL AUTO_INCREMENT,
        `category` VARCHAR(20) NOT NULL,
        `name` VARCHAR(50) NOT NULL,
        `brand` VARCHAR(50) NULL DEFAULT NULL,
        `releasedDate` CHAR(20) NOT NULL,
        `price` INT NOT NULL,
        `photo` VARCHAR(50) NULL DEFAULT NULL,
        `salesStatus` TINYINT(1) NOT NULL DEFAULT '0',
        `stocks` INT NOT NULL,
        `dateAdded` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `dateModified` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(`productNo`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
    --Table`new_schema`.`users`
-- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS`new_schema`.`users`(
        `userNo` INT NOT NULL AUTO_INCREMENT,
        `username` VARCHAR(30) NOT NULL,
        `userId` VARCHAR(30) NOT NULL,
        `password` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
        `phoneNumber` VARCHAR(15) NULL DEFAULT NULL,
        `email` VARCHAR(100) NULL DEFAULT NULL,
        PRIMARY KEY(`userNo`),
        UNIQUE INDEX`userid_UNIQUE`(`userId` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
    --Table`new_schema`.`productsinfo`
-- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS`new_schema`.`productsinfo`(
        `productNo` INT NOT NULL AUTO_INCREMENT,
        `category` VARCHAR(100) NOT NULL,
        `name` VARCHAR(100) NOT NULL,
        `brand` VARCHAR(100) NOT NULL,
        `releasedDate` VARCHAR(45) NULL DEFAULT NULL,
        `price` INT NOT NULL,
        `photo` VARCHAR(255) NULL DEFAULT NULL,
        `salesStatus` TINYINT NOT NULL,
        `stocks` INT NOT NULL,
        `dateAdded` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        `dateModified` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `userNo` INT NULL DEFAULT NULL,
        `userId` VARCHAR(30) NULL DEFAULT NULL,
        PRIMARY KEY(`productNo`),
        INDEX`fk_productsinfo_users_idx`(`userNo` ASC) VISIBLE,
        INDEX`userId_idx`(`userId` ASC) VISIBLE,
        CONSTRAINT`fk_productsinfo_userId`
    FOREIGN KEY(`userId`)
    REFERENCES`new_schema`.`users`(`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
        CONSTRAINT`fk_productsinfo_users`
    FOREIGN KEY(`userNo`)
    REFERENCES`new_schema`.`users`(`userNo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 70
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
    --Table`new_schema`.`reviews`
-- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS`new_schema`.`reviews`(
        `CommentNo` INT NOT NULL AUTO_INCREMENT,
        `rate` INT NOT NULL,
        `commentText` TEXT NOT NULL,
        `dateAdded` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        `dateModified` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `userNo` INT NULL DEFAULT NULL,
        `userId` VARCHAR(30) NULL DEFAULT NULL,
        `productId` INT NULL DEFAULT NULL,
        PRIMARY KEY(`CommentNo`),
        INDEX`fk_reviews_users1_idx`(`userNo` ASC) VISIBLE,
        INDEX`userId_idx`(`userId` ASC) VISIBLE,
        INDEX`productId_idx`(`productId` ASC) VISIBLE,
        CONSTRAINT`fk_reviews_productId`
    FOREIGN KEY(`productId`)
    REFERENCES`new_schema`.`productsinfo`(`productNo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
        CONSTRAINT`fk_reviews_userId`
    FOREIGN KEY(`userId`)
    REFERENCES`new_schema`.`users`(`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
        CONSTRAINT`fk_reviews_users1`
    FOREIGN KEY(`userNo`)
    REFERENCES`new_schema`.`users`(`userNo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 46
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
    --Table`new_schema`.`sessions`
-- -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS`new_schema`.`sessions`(
        `session_id` VARCHAR(128) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
        `expires` INT UNSIGNED NOT NULL,
        `data` MEDIUMTEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
        PRIMARY KEY(`session_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;
