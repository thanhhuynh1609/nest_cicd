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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAll() {
        return await this.productRepository.find({ relations: ['owner'] });
    }
    async findByOwner(userId) {
        return await this.productRepository.find({
            where: { owner: { id: userId } },
            relations: ['owner']
        });
    }
    async searchByName(title) {
        try {
            if (!title) {
                return [];
            }
            return await this.productRepository.find({
                where: { title: (0, typeorm_2.Like)(`%${title}%`) },
                relations: ['owner']
            });
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['owner']
        });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NO_CONTENT);
        }
        return product;
    }
    async create(productDTO, user) {
        const product = this.productRepository.create({
            ...productDTO,
            owner: user,
        });
        return await this.productRepository.save(product);
    }
    async update(id, productDTO, userId) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['owner']
        });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (product.owner.id !== userId) {
            throw new common_1.HttpException('You do not own this product', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.productRepository.update(id, productDTO);
        return await this.findById(id);
    }
    async delete(id, userId) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['owner']
        });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (product.owner.id !== userId) {
            throw new common_1.HttpException('You do not own this product', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.productRepository.remove(product);
        return product;
    }
    async deleteByAdmin(id) {
        const productId = parseInt(id);
        const product = await this.productRepository.findOne({ id: productId });
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.productRepository.manager.query('DELETE FROM order_product WHERE "productId" = $1', [productId]);
        await this.productRepository.delete(productId);
        return { message: 'Product deleted successfully' };
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map