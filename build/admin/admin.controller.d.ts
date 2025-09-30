import { UserService } from '../shared/user.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';
export declare class AdminController {
    private userService;
    private productService;
    private orderService;
    constructor(userService: UserService, productService: ProductService, orderService: OrderService);
    listUsers(): Promise<import("../entities/user.entity").User[]>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    listAllProducts(): Promise<import("../entities/product.entity").Product[]>;
    deleteProduct(id: string): Promise<{
        message: string;
    }>;
    listAllOrders(): Promise<import("../entities/order.entity").Order[]>;
    deleteOrder(id: string): Promise<{
        message: string;
    }>;
}
