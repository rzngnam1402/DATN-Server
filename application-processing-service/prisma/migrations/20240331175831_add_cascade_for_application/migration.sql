-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_applicant_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_beneficiary_detail_id_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicant_detail_id_fkey" FOREIGN KEY ("applicant_detail_id") REFERENCES "ApplicantDetail"("applicant_detail_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_beneficiary_detail_id_fkey" FOREIGN KEY ("beneficiary_detail_id") REFERENCES "BeneficiaryDetail"("beneficiary_detail_id") ON DELETE CASCADE ON UPDATE CASCADE;
