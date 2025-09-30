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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AdminSeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let AdminSeederService = AdminSeederService_1 = class AdminSeederService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(AdminSeederService_1.name);
    }
    async seedAdmin() {
        try {
            const existingAdmin = await this.userRepository.findOne({
                where: { username: 'admin' }
            });
            if (existingAdmin) {
                this.logger.log('Admin user already exists');
                return;
            }
            const adminUser = this.userRepository.create({
                username: 'admin',
                password: '123',
                admin: true,
                seller: false
            });
            await this.userRepository.save(adminUser);
            this.logger.log('Admin user created successfully - Username: admin, Password: 123');
        }
        catch (error) {
            this.logger.error('Failed to create admin user:', error);
        }
    }
};
AdminSeederService = AdminSeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminSeederService);
exports.AdminSeederService = AdminSeederService;
//# sourceMappingURL=admin-seeder.service.js.map