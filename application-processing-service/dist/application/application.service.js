"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const status_enum_1 = require("../enum/status.enum");
let ApplicationsService = class ApplicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, collateralFile) {
        const effectiveDate = new Date(dto.effectiveDate);
        const file = collateralFile[0];
        const applicationData = {
            bankName: dto.bankName,
            amount: dto.amount,
            currency: dto.currency,
            effectiveDate,
            purpose: dto.purpose,
            status: status_enum_1.ApplicationStatus.UNDER_REVIEW,
            collateralFile: file ? file.buffer : null,
            ApplicantDetail: {
                create: {
                    businessName: dto.businessName,
                    businessRegistrationNumber: dto.businessRegistrationNumber,
                    businessAddress: dto.businessAddress,
                    debitAccountNo: dto.debitAccountNo,
                    contactPersonName: dto.contactPersonName,
                    citizenID: dto.citizenID,
                    applicantEmail: dto.applicantEmail,
                },
            },
            BeneficiaryDetail: {
                create: {
                    businessName: dto.beneficiaryBusinessName,
                    businessRegistrationNumber: dto.beneficiaryBusinessRegistrationNumber,
                    businessAddress: dto.beneficiaryBusinessAddress,
                    email: dto.beneficiaryEmail,
                },
            },
        };
        return this.prisma.application.create({
            data: applicationData,
        });
    }
    async getAll() {
        const response = await this.prisma.application.findMany();
        return response;
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=application.service.js.map