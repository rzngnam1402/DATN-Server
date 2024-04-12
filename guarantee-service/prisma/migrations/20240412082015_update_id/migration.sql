-- AlterTable
ALTER TABLE "ApplicantDetail" ALTER COLUMN "applicant_detail_id" DROP DEFAULT;
DROP SEQUENCE "ApplicantDetail_applicant_detail_id_seq";

-- AlterTable
ALTER TABLE "BeneficiaryDetail" ALTER COLUMN "beneficiary_detail_id" DROP DEFAULT;
DROP SEQUENCE "BeneficiaryDetail_beneficiary_detail_id_seq";
