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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const order_product_entity_1 = require("../entities/order-product.entity");
const product_entity_1 = require("../entities/product.entity");
let OrderService = class OrderService {
    constructor(orderRepository, orderProductRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.productRepository = productRepository;
    }
    async listOrdersByUser(userId) {
        const orders = await this.orderRepository.find({
            where: { owner: { id: userId } },
            relations: ['owner', 'products', 'products.product', 'products.product.owner'],
        });
        return orders;
    }
    async create(orderDTO, userId) {
        const { products } = orderDTO;
        const order = this.orderRepository.create({
            owner: { id: userId },
            trangThai: 'pending',
            tongTien: 0
        });
        const savedOrder = await this.orderRepository.save(order);
        let totalAmount = 0;
        const orderProducts = [];
        for (const productData of products) {
            const product = await this.productRepository.findOne({
                id: productData.productId
            });
            if (!product) {
                throw new common_1.HttpException(`Product ${productData.productId} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            const orderProduct = this.orderProductRepository.create({
                order: savedOrder,
                product: product,
                quantity: productData.quantity
            });
            orderProducts.push(orderProduct);
            totalAmount += product.price * productData.quantity;
        }
        await this.orderProductRepository.save(orderProducts);
        savedOrder.tongTien = totalAmount;
        await this.orderRepository.save(savedOrder);
        return savedOrder;
    }
    async listOrdersForSeller(sellerId) {
        const orders = await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.owner', 'owner')
            .leftJoinAndSelect('order.products', 'orderProduct')
            .leftJoinAndSelect('orderProduct.product', 'product')
            .leftJoinAndSelect('product.owner', 'productOwner')
            .where('productOwner.id = :sellerId', { sellerId })
            .getMany();
        return orders;
    }
    async listAllOrders() {
        const orders = await this.orderRepository.find({
            relations: ['owner', 'products', 'products.product', 'products.product.owner'],
        });
        return orders;
    }
    async deleteByAdmin(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['products']
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (order.products && order.products.length > 0) {
            await this.orderProductRepository.remove(order.products);
        }
        await this.orderRepository.remove(order);
        return { message: 'Order deleted successfully' };
    }
    async updateOrderStatus(id, updateOrderStatusDTO) {
        const order = await this.orderRepository.findOne({
            where: { id }
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (order.trangThai === 'Đã hủy' || order.trangThai === 'Đã giao') {
            throw new common_1.HttpException('Cannot update status of a cancelled or delivered order', common_1.HttpStatus.BAD_REQUEST);
        }
        order.trangThai = updateOrderStatusDTO.trangThai;
        await this.orderRepository.save(order);
        return await this.orderRepository.findOne({
            where: { id },
            relations: ['owner', 'products', 'products.product', 'products.product.owner'],
        });
    }
    async updateOrderStatusBySeller(orderId, sellerId, updateOrderStatusDTO) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['products', 'products.product', 'products.product.owner'],
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        const ownsProduct = order.products.some((item) => item.product && item.product.owner.id === sellerId);
        if (!ownsProduct) {
            throw new common_1.HttpException('Forbidden: You cannot update this order', common_1.HttpStatus.FORBIDDEN);
        }
        if (order.trangThai === 'Đã hủy' || order.trangThai === 'Đã giao') {
            throw new common_1.HttpException('Cannot update status of a cancelled or delivered order', common_1.HttpStatus.BAD_REQUEST);
        }
        order.trangThai = updateOrderStatusDTO.trangThai;
        await this.orderRepository.save(order);
        return await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['owner', 'products', 'products.product', 'products.product.owner'],
        });
    }
    async getOrderById(id, userId) {
        const order = await this.orderRepository.findOne({
            where: { id, owner: { id: userId } },
            relations: ['owner', 'products', 'products.product', 'products.product.owner'],
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        return order;
    }
    async deleteOrder(id, userId) {
        const order = await this.orderRepository.findOne({
            where: { id, owner: { id: userId } },
            relations: ['products']
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (order.products && order.products.length > 0) {
            await this.orderProductRepository.remove(order.products);
        }
        await this.orderRepository.remove(order);
        return { message: 'Order deleted successfully' };
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_product_entity_1.OrderProduct)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map