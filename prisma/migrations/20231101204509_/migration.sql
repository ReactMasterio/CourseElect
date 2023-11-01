-- CreateTable
CREATE TABLE `course` (
    `CID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `CTitle` VARCHAR(100) NOT NULL,
    `CDescription` JSON NULL,
    `CPrice` DECIMAL(10, 2) NOT NULL,
    `CTime` VARCHAR(50) NULL,
    `CLikes` INTEGER NULL DEFAULT 0,
    `CDislikes` INTEGER NULL DEFAULT 0,
    `CTeacherName` VARCHAR(50) NULL,
    `CVotes` INTEGER NULL DEFAULT 0,

    UNIQUE INDEX `CID`(`CID`),
    UNIQUE INDEX `CTitle`(`CTitle`),
    PRIMARY KEY (`CID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UID` VARCHAR(14) NOT NULL,
    `UFirstname` VARCHAR(100) NULL,
    `ULastname` VARCHAR(100) NULL,
    `Username` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `UEmail` VARCHAR(100) NULL,
    `URole` VARCHAR(20) NULL,
    `USSN` VARCHAR(10) NULL,
    `UPhoneNumber` VARCHAR(15) NULL,

    UNIQUE INDEX `UID`(`UID`),
    UNIQUE INDEX `USSN`(`USSN`),
    PRIMARY KEY (`UID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `CID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `CVotes` INTEGER NULL,

    UNIQUE INDEX `CID`(`CID`),
    PRIMARY KEY (`CID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `course`(`CID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
