import { User as UserDocument } from '../entities/user.entity';
import { OrderService } from './order.service';
import { UpdateOrderStatusDTO } from './order.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    listOrders(user: UserDocument): Promise<import("../entities/order.entity").Order[]>;
    createOrder(orderDTO: any, user: any): Promise<import("../entities/order.entity").Order>;
    listOrdersForSeller(user: UserDocument): Promise<import("../entities/order.entity").Order[]>;
    listAllOrders(): Promise<import("../entities/order.entity").Order[]>;
    updateOrderStatus(id: string, updateOrderStatusDTO: UpdateOrderStatusDTO): Promise<import("../entities/order.entity").Order>;
    deleteByAdmin(id: string): Promise<{
        message: string;
    }>;
    updateOrderStatusBySeller(orderId: string, { id }: UserDocument, updateOrderStatusDTO: UpdateOrderStatusDTO): Promise<import("../entities/order.entity").Order>;
    getOrderById(id: string, user: UserDocument): Promise<import("../entities/order.entity").Order>;
    deleteOrder(id: string, user: UserDocument): Promise<{
        message: string;
    }>;
}
