export interface CreateOrderDTO {
    products: {
        product: string;
        quantity: number;
    }[];
}
export declare class UpdateOrderStatusDTO {
    readonly trangThai: 'Chờ xử lý' | 'Đang giao hàng' | 'Đã giao' | 'Đã hủy';
}
