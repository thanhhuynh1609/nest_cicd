import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';
import { Product } from '../entities/product.entity';
import { UpdateOrderStatusDTO } from './order.dto';
export declare class OrderService {
    private orderRepository;
    private orderProductRepository;
    private productRepository;
    constructor(orderRepository: Repository<Order>, orderProductRepository: Repository<OrderProduct>, productRepository: Repository<Product>);
    listOrdersByUser(userId: number): Promise<Order[]>;
    create(orderDTO: any, userId: number): Promise<Order>;
    listOrdersForSeller(sellerId: number): Promise<Order[]>;
    listAllOrders(): Promise<Order[]>;
    deleteByAdmin(id: number): Promise<{
        message: string;
    }>;
    updateOrderStatus(id: number, updateOrderStatusDTO: UpdateOrderStatusDTO): Promise<Order>;
    updateOrderStatusBySeller(orderId: number, sellerId: number, updateOrderStatusDTO: UpdateOrderStatusDTO): Promise<Order>;
    getOrderById(id: number, userId: number): Promise<Order>;
    deleteOrder(id: number, userId: number): Promise<{
        message: string;
    }>;
}
