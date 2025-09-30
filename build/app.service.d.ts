import { OnModuleInit } from '@nestjs/common';
import { AdminSeederService } from './shared/admin-seeder.service';
export declare class AppService implements OnModuleInit {
    private adminSeederService;
    constructor(adminSeederService: AdminSeederService);
    onModuleInit(): Promise<void>;
    getHello(): string;
}
