-- CreateTable
CREATE TABLE `Wine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `varietal` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NULL,
    `consumed` BOOLEAN NULL,
    `dateConsumed` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
