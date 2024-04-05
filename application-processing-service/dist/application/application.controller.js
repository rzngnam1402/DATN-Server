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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
const microservices_1 = require("@nestjs/microservices");
let ApplicationController = class ApplicationController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    handleCreate(payload) {
        const dto = payload.data;
        const file = payload.collateralFile;
        console.log(dto, payload.collateralFile);
        return this.applicationsService.create(dto, file);
    }
    handleGetAllApplicationsUser(payload) {
        const data = payload;
        return this.applicationsService.getAllApplicationsUser(data);
    }
    handleGetAllApplicationsBanker(payload) {
        const data = payload;
        return this.applicationsService.getAllApplicationsBanker(data);
    }
    handleGetApplicationById(payload) {
        const data = payload;
        return this.applicationsService.getApplicationById(data);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "handleCreate", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-all-apps-user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "handleGetAllApplicationsUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-all-apps-banker' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "handleGetAllApplicationsBanker", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-app-by-id' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "handleGetApplicationById", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [application_service_1.ApplicationsService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map