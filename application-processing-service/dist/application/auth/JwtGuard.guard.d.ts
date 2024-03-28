import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class JwtAuthGuard implements CanActivate {
    private client;
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
