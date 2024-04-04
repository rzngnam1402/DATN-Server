/// <reference types="multer" />
import { PrismaService } from '../prisma/prisma.service';
import { ApplicationDto } from 'src/dto/application.dto';
export declare class ApplicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: ApplicationDto, collateralFile: Express.Multer.File[]): Promise<{
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
    getAllApplicationsUser(email: string): Promise<({
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
    getAllApplicationsBanker(company: string): Promise<({
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
}
