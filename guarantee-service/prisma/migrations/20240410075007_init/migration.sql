-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_ISSUED', 'ISSUED');

-- CreateTable
CREATE TABLE "guarantees" (
    "guarantee_id" SERIAL NOT NULL,
    "applicant_detail_id" INTEGER NOT NULL,
    "beneficiary_detail_id" INTEGER NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "collateralFile" TEXT,
    "currency" VARCHAR(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_ISSUED',
    "purpose" TEXT NOT NULL,
    "docURL" TEXT,
    "signatureImg" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guarantees_pkey" PRIMARY KEY ("guarantee_id")
);

-- CreateTable
CREATE TABLE "ApplicantDetail" (
    "applicant_detail_id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegistrationNumber" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "debitAccountNo" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "citizenID" TEXT NOT NULL,
    "applicantEmail" TEXT NOT NULL,

    CONSTRAINT "ApplicantDetail_pkey" PRIMARY KEY ("applicant_detail_id")
);

-- CreateTable
CREATE TABLE "BeneficiaryDetail" (
    "beneficiary_detail_id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegistrationNumber" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "BeneficiaryDetail_pkey" PRIMARY KEY ("beneficiary_detail_id")
);

-- AddForeignKey
ALTER TABLE "guarantees" ADD CONSTRAINT "guarantees_applicant_detail_id_fkey" FOREIGN KEY ("applicant_detail_id") REFERENCES "ApplicantDetail"("applicant_detail_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guarantees" ADD CONSTRAINT "guarantees_beneficiary_detail_id_fkey" FOREIGN KEY ("beneficiary_detail_id") REFERENCES "BeneficiaryDetail"("beneficiary_detail_id") ON DELETE CASCADE ON UPDATE CASCADE;
