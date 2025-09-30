import { Document, Types } from 'mongoose';
import { User } from './user';
import { Product } from './product';
interface ProductOrder {
    product: Product;
    quantity: number;
}
export interface Order extends Document {
    trangThai: 'Chờ xử lý' | 'Đang giao hàng' | 'Đã giao' | 'Đã hủy';
    owner: Types.ObjectId | User;
    totalPrice: number;
    products: ProductOrder[];
    created: Date;
}
export {};
