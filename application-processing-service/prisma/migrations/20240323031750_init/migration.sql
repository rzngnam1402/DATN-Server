-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UNDER_REVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "application_id" SERIAL NOT NULL,
    "applicant_detail_id" INTEGER NOT NULL,
    "beneficiary_detail_id" INTEGER NOT NULL,
    "bankName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "collateralFile" BYTEA NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "ApplicantDetail" (
    "applicant_detail_id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegistrationNumber" INTEGER NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "debitAccountNo" INTEGER NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "citizenID" INTEGER NOT NULL,
    "applicantEmail" TEXT NOT NULL,

    CONSTRAINT "ApplicantDetail_pkey" PRIMARY KEY ("applicant_detail_id")
);

-- CreateTable
CREATE TABLE "BeneficiaryDetail" (
    "beneficiary_detail_id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegistrationNumber" INTEGER NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "BeneficiaryDetail_pkey" PRIMARY KEY ("beneficiary_detail_id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicant_detail_id_fkey" FOREIGN KEY ("applicant_detail_id") REFERENCES "ApplicantDetail"("applicant_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_beneficiary_detail_id_fkey" FOREIGN KEY ("beneficiary_detail_id") REFERENCES "BeneficiaryDetail"("beneficiary_detail_id") ON DELETE RESTRICT ON UPDATE CASCADE;
