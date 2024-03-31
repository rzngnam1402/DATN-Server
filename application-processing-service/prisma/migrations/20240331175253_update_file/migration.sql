/*
  Warnings:

  - Made the column `collateralFile` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "collateralFile" SET NOT NULL,
ALTER COLUMN "collateralFile" SET DATA TYPE TEXT;
