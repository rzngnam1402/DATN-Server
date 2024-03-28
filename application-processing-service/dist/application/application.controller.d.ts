/// <reference types="multer" />
/// <reference types="node" />
import { ApplicationsService } from './application.service';
import { ApplicationDto } from 'src/dto/application.dto';
export declare class ApplicationController {
    private applicationsService;
    constructor(applicationsService: ApplicationsService);
    create(dto: ApplicationDto, collateralFile: Express.Multer.File[]): Promise<{
        application_id: number;
        applicant_detail_id: number;
        beneficiary_detail_id: number;
        bankName: string;
        amount: string;
        collateralFile: Buffer;
        currency: string;
        effectiveDate: Date;
        status: import(".prisma/client").$Enums.Status;
        purpose: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAll(): Promise<{
        application_id: number;
        applicant_detail_id: number;
        beneficiary_detail_id: number;
        bankName: string;
        amount: string;
        collateralFile: Buffer;
        currency: string;
        effectiveDate: Date;
        status: import(".prisma/client").$Enums.Status;
        purpose: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
