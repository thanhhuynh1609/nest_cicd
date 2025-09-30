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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const admin_guard_1 = require("../guards/admin.guard");
const user_service_1 = require("../shared/user.service");
const product_service_1 = require("../product/product.service");
const order_service_1 = require("../order/order.service");
let AdminController = class AdminController {
    constructor(userService, productService, orderService) {
        this.userService = userService;
        this.productService = productService;
        this.orderService = orderService;
    }
    async listUsers() {
        try {
            return await this.userService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        try {
            return await this.userService.delete(id);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listAllProducts() {
        return await this.productService.findAll();
    }
    async deleteProduct(id) {
        try {
            return await this.productService.deleteByAdmin(id);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete product', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listAllOrders() {
        return await this.orderService.listAllOrders();
    }
    async deleteOrder(id) {
        try {
            return await this.orderService.deleteByAdmin(parseInt(id));
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete order', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listUsers", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAllProducts", null);
__decorate([
    (0, common_1.Delete)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Get)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listAllOrders", null);
__decorate([
    (0, common_1.Delete)('orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteOrder", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [user_service_1.UserService,
        product_service_1.ProductService,
        order_service_1.OrderService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map