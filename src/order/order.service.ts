import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderProduct } from '../entities/order-product.entity';
import { Product } from '../entities/product.entity';
import { CreateOrderDTO, UpdateOrderStatusDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async listOrdersByUser(userId: number) {
    const orders = await this.orderRepository.find({
      where: { owner: { id: userId } },
      relations: ['owner', 'products', 'products.product', 'products.product.owner'],
    });

    return orders;
  }

  async create(orderDTO: any, userId: number) {
    const { products } = orderDTO;
    
    // Tạo order trước
    const order = this.orderRepository.create({
      owner: { id: userId },
      trangThai: 'pending',
      tongTien: 0
    });
    
    const savedOrder = await this.orderRepository.save(order);
    
    // Tạo OrderProduct entries
    let totalAmount = 0;
    const orderProducts = [];
    
    for (const productData of products) {
      const product = await this.productRepository.findOne({ 
        id: productData.productId 
      });
      
      if (!product) {
        throw new HttpException(`Product ${productData.productId} not found`, HttpStatus.NOT_FOUND);
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
    
    // Cập nhật tổng tiền
    savedOrder.tongTien = totalAmount;
    await this.orderRepository.save(savedOrder);
    
    return savedOrder;
  }

  async listOrdersForSeller(sellerId: number) {
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

  async deleteByAdmin(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['products']
    });
    
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Xóa OrderProducts trước
    if (order.products && order.products.length > 0) {
      await this.orderProductRepository.remove(order.products);
    }

    // Sau đó xóa Order
    await this.orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  }

  async updateOrderStatus(id: number, updateOrderStatusDTO: UpdateOrderStatusDTO) {
    const order = await this.orderRepository.findOne({
      where: { id }
    });
    
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    
    if (order.trangThai === 'Đã hủy' || order.trangThai === 'Đã giao') {
      throw new HttpException(
        'Cannot update status of a cancelled or delivered order',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    order.trangThai = updateOrderStatusDTO.trangThai;
    await this.orderRepository.save(order);
    
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['owner', 'products', 'products.product', 'products.product.owner'],
    });
  }

  async updateOrderStatusBySeller(
    orderId: number,
    sellerId: number,
    updateOrderStatusDTO: UpdateOrderStatusDTO,
  ) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['products', 'products.product', 'products.product.owner'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Kiểm tra xem seller có sở hữu ít nhất một sản phẩm trong đơn hàng không
    const ownsProduct = order.products.some(
      (item) => item.product && item.product.owner.id === sellerId,
    );

    if (!ownsProduct) {
      throw new HttpException(
        'Forbidden: You cannot update this order',
        HttpStatus.FORBIDDEN,
      );
    }

    if (order.trangThai === 'Đã hủy' || order.trangThai === 'Đã giao') {
      throw new HttpException(
        'Cannot update status of a cancelled or delivered order',
        HttpStatus.BAD_REQUEST,
      );
    }

    order.trangThai = updateOrderStatusDTO.trangThai;
    await this.orderRepository.save(order);

    return await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['owner', 'products', 'products.product', 'products.product.owner'],
    });
  }

  async getOrderById(id: number, userId: number) {
    const order = await this.orderRepository.findOne({
      where: { id, owner: { id: userId } },
      relations: ['owner', 'products', 'products.product', 'products.product.owner'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async deleteOrder(id: number, userId: number) {
    const order = await this.orderRepository.findOne({
      where: { id, owner: { id: userId } },
      relations: ['products']
    });
    
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Xóa các OrderProduct trước
    if (order.products && order.products.length > 0) {
      await this.orderProductRepository.remove(order.products);
    }

    // Sau đó xóa Order
    await this.orderRepository.remove(order);
    return { message: 'Order deleted successfully' };
  }
}






