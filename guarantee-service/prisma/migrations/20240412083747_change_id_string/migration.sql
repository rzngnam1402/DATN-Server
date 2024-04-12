/*
  Warnings:

  - The primary key for the `ApplicantDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BeneficiaryDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "guarantees" DROP CONSTRAINT "guarantees_applicant_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "guarantees" DROP CONSTRAINT "guarantees_beneficiary_detail_id_fkey";

-- AlterTable
ALTER TABLE "ApplicantDetail" DROP CONSTRAINT "ApplicantDetail_pkey",
ALTER COLUMN "applicant_detail_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ApplicantDetail_pkey" PRIMARY KEY ("applicant_detail_id");

-- AlterTable
ALTER TABLE "BeneficiaryDetail" DROP CONSTRAINT "BeneficiaryDetail_pkey",
ALTER COLUMN "beneficiary_detail_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BeneficiaryDetail_pkey" PRIMARY KEY ("beneficiary_detail_id");

-- AlterTable
ALTER TABLE "guarantees" ALTER COLUMN "applicant_detail_id" SET DATA TYPE TEXT,
ALTER COLUMN "beneficiary_detail_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "guarantees" ADD CONSTRAINT "guarantees_applicant_detail_id_fkey" FOREIGN KEY ("applicant_detail_id") REFERENCES "ApplicantDetail"("applicant_detail_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guarantees" ADD CONSTRAINT "guarantees_beneficiary_detail_id_fkey" FOREIGN KEY ("beneficiary_detail_id") REFERENCES "BeneficiaryDetail"("beneficiary_detail_id") ON DELETE CASCADE ON UPDATE CASCADE;
