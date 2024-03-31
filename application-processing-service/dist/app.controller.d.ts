import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    handlePing(data: any): string;
    create_2(data: any): void;
}
