import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../utilities/user.decorator';
import { User as UserDocument } from '../entities/user.entity';
import { OrderService } from './order.service';
import { CreateOrderDTO, UpdateOrderStatusDTO } from './order.dto';
import { SellerGuard } from '../guards/seller.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listOrders(@User() user: UserDocument) {
    const { id } = user;
    return await this.orderService.listOrdersByUser(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Body() orderDTO: any, @User() user: any) {
    return await this.orderService.create(orderDTO, user.id);
  }

  @Get('seller-orders')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listOrdersForSeller(@User() user: UserDocument) {
    const { id } = user;
    return await this.orderService.listOrdersForSeller(id);
  }

  @Get('admin/orders')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async listAllOrders() {
    return await this.orderService.listAllOrders();
  }

  @Patch('admin/orders/:id/status')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDTO: UpdateOrderStatusDTO,
  ) {
    return await this.orderService.updateOrderStatus(parseInt(id), updateOrderStatusDTO);
  }

  @Delete('admin/orders/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async deleteByAdmin(@Param('id') id: string) {
    return await this.orderService.deleteByAdmin(parseInt(id));
  }

  @Patch('seller-orders/:id/status')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async updateOrderStatusBySeller(
    @Param('id') orderId: string,
    @User() { id }: UserDocument,
    @Body() updateOrderStatusDTO: UpdateOrderStatusDTO,
  ) {
    return await this.orderService.updateOrderStatusBySeller(parseInt(orderId), id, updateOrderStatusDTO);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOrderById(@Param('id') id: string, @User() user: UserDocument) {
    return await this.orderService.getOrderById(parseInt(id), user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteOrder(@Param('id') id: string, @User() user: UserDocument) {
    return await this.orderService.deleteOrder(parseInt(id), user.id);
  }
}



