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
    getAll(): Promise<{
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
