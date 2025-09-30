"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDTO) {
        const { username } = userDTO;
        const user = await this.userRepository.findOne({ username });
        if (user) {
            throw new common_1.HttpException('Tên tài khoản đã được đăng ký!', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdUser = this.userRepository.create(userDTO);
        await this.userRepository.save(createdUser);
        return this.sanitizeUser(createdUser);
    }
    async findAll() {
        const users = await this.userRepository.find({
            select: ['id', 'username', 'seller', 'admin', 'created']
        });
        return users;
    }
    async findByLogin(userDTO) {
        const { username, password } = userDTO;
        const user = await this.userRepository.findOne({
            where: { username },
            select: ['id', 'username', 'password', 'seller', 'created', 'admin']
        });
        if (!user) {
            throw new common_1.HttpException('Tài khoản hoặc mật khẩu không đúng!', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.sanitizeUser(user);
        }
        else {
            throw new common_1.HttpException('Tài khoản hoặc mật khẩu không đúng!', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async findByPayload(payload) {
        const { username } = payload;
        return await this.userRepository.findOne({ username });
    }
    sanitizeUser(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async delete(id) {
        const userId = parseInt(id);
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.userRepository.delete(userId);
        return { message: 'User deleted successfully' };
    }
    async update(id, updateUserDTO) {
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (updateUserDTO.password) {
            updateUserDTO.password = await bcrypt.hash(updateUserDTO.password, 12);
        }
        await this.userRepository.update(id, updateUserDTO);
        const updatedUser = await this.userRepository.findOne({ id });
        return this.sanitizeUser(updatedUser);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map