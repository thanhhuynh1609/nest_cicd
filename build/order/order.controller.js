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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("../utilities/user.decorator");
const user_entity_1 = require("../entities/user.entity");
const order_service_1 = require("./order.service");
const order_dto_1 = require("./order.dto");
const seller_guard_1 = require("../guards/seller.guard");
const admin_guard_1 = require("../guards/admin.guard");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async listOrders(user) {
        const { id } = user;
        return await this.orderService.listOrdersByUser(id);
    }
    async createOrder(orderDTO, user) {
        return await this.orderService.create(orderDTO, user.id);
    }
    async listOrdersForSeller(user) {
        const { id } = user;
        return await this.orderService.listOrdersForSeller(id);
    }
    async listAllOrders() {
        return await this.orderService.listAllOrders();
    }
    async updateOrderStatus(id, updateOrderStatusDTO) {
        return await this.orderService.updateOrderStatus(parseInt(id), updateOrderStatusDTO);
    }
    async deleteByAdmin(id) {
        return await this.orderService.deleteByAdmin(parseInt(id));
    }
    async updateOrderStatusBySeller(orderId, { id }, updateOrderStatusDTO) {
        return await this.orderService.updateOrderStatusBySeller(parseInt(orderId), id, updateOrderStatusDTO);
    }
    async getOrderById(id, user) {
        return await this.orderService.getOrderById(parseInt(id), user.id);
    }
    async deleteOrder(id, user) {
        return await this.orderService.deleteOrder(parseInt(id), user.id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "listOrders", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('seller-orders'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), seller_guard_1.SellerGuard),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "listOrdersForSeller", null);
__decorate([
    (0, common_1.Get)('admin/orders'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "listAllOrders", null);
__decorate([
    (0, common_1.Patch)('admin/orders/:id/status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdateOrderStatusDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Delete)('admin/orders/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteByAdmin", null);
__decorate([
    (0, common_1.Patch)('seller-orders/:id/status'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), seller_guard_1.SellerGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        order_dto_1.UpdateOrderStatusDTO]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrderStatusBySeller", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map