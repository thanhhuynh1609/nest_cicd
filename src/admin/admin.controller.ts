import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin.guard';
import { UserService } from '../shared/user.service';
import { ProductService } from '../product/product.service';
import { OrderService } from '../order/order.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), AdminGuard) // Đảm bảo rằng cả hai guard đều được sử dụng
export class AdminController {
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  // Quản lý User
  @Get('users')
  async listUsers() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Quản lý Product
  @Get('products')
  async listAllProducts() {
    return await this.productService.findAll();
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productService.deleteByAdmin(id);
    } catch (error) {
      throw new HttpException('Failed to delete product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Quản lý Order
  @Get('orders')
  async listAllOrders() {
    return await this.orderService.listAllOrders();
  }

  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string) {
    try {
      return await this.orderService.deleteByAdmin(parseInt(id));
    } catch (error) {
      throw new HttpException('Failed to delete order', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
