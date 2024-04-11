import { ApplicationStatus } from 'src/enum/status.enum';
export declare class ApplicationDto {
    businessName: string;
    businessRegistrationNumber: string;
    businessAddress: string;
    debitAccountNo: string;
    contactPersonName: string;
    citizenID: string;
    status: ApplicationStatus;
    applicantEmail: string;
    beneficiaryBusinessName: string;
    beneficiaryBusinessRegistrationNumber: string;
    beneficiaryBusinessAddress: string;
    beneficiaryEmail: string;
    bankName: string;
    amount: string;
    collateralFile: any;
    currency: string;
    effectiveDate: Date;
    purpose: string;
}
