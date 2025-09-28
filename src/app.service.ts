import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdminSeederService } from './shared/admin-seeder.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private adminSeederService: AdminSeederService) {}

  async onModuleInit() {
    await this.adminSeederService.seedAdmin();
  }

  getHello(): string {
    return 'Hello World!';
  }
}

