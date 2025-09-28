import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AdminSeederService {
  private readonly logger = new Logger(AdminSeederService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seedAdmin() {
    try {
      // Kiểm tra xem admin đã tồn tại chưa
      const existingAdmin = await this.userRepository.findOne({
        where: { username: 'admin' }
      });

      if (existingAdmin) {
        this.logger.log('Admin user already exists');
        return;
      }

      // Tạo admin user mới - KHÔNG hash password ở đây
      // Để @BeforeInsert() trong entity tự động hash
      const adminUser = this.userRepository.create({
        username: 'admin',
        password: '123', // Password thô, sẽ được hash tự động
        admin: true,
        seller: false
      });

      await this.userRepository.save(adminUser);
      this.logger.log('Admin user created successfully - Username: admin, Password: 123');
      
    } catch (error) {
      this.logger.error('Failed to create admin user:', error);
    }
  }
}
