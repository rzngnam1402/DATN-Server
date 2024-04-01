import { ApplicationsService } from './application.service';
export declare class ApplicationController {
    private applicationsService;
    constructor(applicationsService: ApplicationsService);
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
    handleGetAll(payload: any): Promise<{
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
    }[]>;
}
