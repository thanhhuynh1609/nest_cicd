import { Order } from './order.entity';
import { Product } from './product.entity';
export declare class OrderProduct {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
}
