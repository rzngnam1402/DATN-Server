import { ApplicationService } from './application.service';
export declare class ApplicationController {
    private applicationService;
    constructor(applicationService: ApplicationService);
    handleCreate(payload: any): Promise<{
        application_id: number;
        applicant_detail_id: number;
        beneficiary_detail_id: number;
        bankName: string;
        amount: string;
        collateralFile: string;
        currency: string;
        effectiveDate: Date;
        status: import(".prisma/client").$Enums.Status;
        purpose: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    handleGetAllApplicationsUser(payload: string): Promise<({
        ApplicantDetail: {
            applicant_detail_id: number;
            businessName: string;
            businessRegistrationNumber: string;
            businessAddress: string;
            debitAccountNo: string;
            contactPersonName: string;
            citizenID: string;
            applicantEmail: string;
        };
        BeneficiaryDetail: {
            beneficiary_detail_id: number;
            businessName: string;
            businessRegistrationNumber: string;
            businessAddress: string;
            email: string;
        };
    } & {
        application_id: number;
        applicant_detail_id: number;
        beneficiary_detail_id: number;
        bankName: string;
        amount: string;
        collateralFile: string;
        currency: string;
        effectiveDate: Date;
        status: import(".prisma/client").$Enums.Status;
        purpose: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    handleGetAllApplicationsBanker(payload: string): Promise<({
        ApplicantDetail: {
            applicant_detail_id: number;
            businessName: string;
            businessRegistrationNumber: string;
            businessAddress: string;
            debitAccountNo: string;
            contactPersonName: string;
            citizenID: string;
            applicantEmail: string;
        };
        BeneficiaryDetail: {
            beneficiary_detail_id: number;
            businessName: string;
            businessRegistrationNumber: string;
            businessAddress: string;
            email: string;
        };
    } & {
        application_id: number;
        applicant_detail_id: number;
        beneficiary_detail_id: number;
        bankName: string;
        amount: string;
        collateralFile: string;
        currency: string;
        effectiveDate: Date;
        status: import(".prisma/client").$Enums.Status;
        purpose: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    handleGetApplicationById(payload: number): Promise<import("@nestjs/common").ForbiddenException | ({
        ApplicantDetail: {
            applicant_detail_id: number;
            businessName: string;
            businessRegistrationNumber: string;
            businessAddress: string;
            debitAccountNo: string;
            contactPersonName: string;
            citizenID: string;
            applicantEmail: string;
        };
        BeneficiaryDetail: {
            beneficiary_detail_id: number;
            businessName: string;
            businessRegistrationNumber: string;
            businessAddress: string;
            email: string;
        };
    } & {
        application_id: number;
        applicant_detail_id: number;
        beneficiary_detail_id: number;
        bankName: string;
        amount: string;
        collateralFile: string;
        currency: string;
        effectiveDate: Date;
        status: import(".prisma/client").$Enums.Status;
        purpose: string;
        createdAt: Date;
        updatedAt: Date;
    })>;
    handleUpdateApplicationById(payload: any): Promise<any>;
}
