import { User } from './user.entity';
import { OrderProduct } from './order-product.entity';
export declare class Order {
    id: number;
    owner: User;
    products: OrderProduct[];
    trangThai: string;
    tongTien: number;
    created: Date;
}
