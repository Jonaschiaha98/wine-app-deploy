-- AlterTable
ALTER TABLE `user` ADD COLUMN `token` VARCHAR(191) NULL,
    ADD COLUMN `tokenExpiry` DATETIME(3) NULL;
