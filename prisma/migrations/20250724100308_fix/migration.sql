-- AlterTable
ALTER TABLE `Product` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `category` VARCHAR(191) NULL,
    MODIFY `price` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NULL;
ALTER TABLE `Product` CHANGE `image` `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL AFTER `category`; --Added manually to ensure correct column order.