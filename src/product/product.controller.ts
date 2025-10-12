import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '../guards/seller.guard';
import { Product } from '../entities/product.entity';
import { User as UserDocument } from '../entities/user.entity';
import { User } from '../utilities/user.decorator';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiQuery, 
  ApiParam, 
  ApiBearerAuth 
} from '@nestjs/swagger';  // Thêm import này

@ApiTags('products')  // Nhóm tất cả endpoints vào tag 'products'
@ApiBearerAuth()  // Hỗ trợ Bearer token cho tất cả endpoints (vì dùng JWT)
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })  // Mô tả ngắn gọn
  @ApiResponse({ 
    status: 200, 
    description: 'List of all products', 
    type: [Product]  // Schema response dựa trên entity
  })
  async listAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by title' })
  @ApiQuery({ name: 'title', type: String, description: 'Product title to search' })  // Mô tả query param
  @ApiResponse({ status: 200, description: 'List of matching products', type: [Product] })
  async searchProducts(@Query('title') title: string) {
    return this.productService.searchByName(title);
  }

  @Get('/mine')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  @ApiOperation({ summary: 'Get products owned by current seller' })
  @ApiResponse({ status: 200, description: 'List of seller\'s products', type: [Product] })
  async listMine(@User() user: UserDocument): Promise<Product[]> {
    const { id } = user;
    return await this.productService.findByOwner(id);
  }

  @Get('/seller/:id')
  @ApiOperation({ summary: 'Get products by seller ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Seller ID' })  // Mô tả path param
  @ApiResponse({ status: 200, description: 'List of seller\'s products', type: [Product] })
  async listBySeller(@Param('id') id: string): Promise<Product[]> {
    return await this.productService.findByOwner(parseInt(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
  async create(
    @Body() product: CreateProductDTO,
    @User() user: UserDocument,
  ): Promise<Product> {
    return await this.productService.create(product, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product details', type: Product })
  async read(@Param('id') id: string): Promise<Product> {
    return await this.productService.findById(parseInt(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  async update(
    @Param('id') id: string,
    @Body() product: UpdateProductDTO,
    @User() user: UserDocument,
  ): Promise<Product> {
    const { id: userId } = user;
    return await this.productService.update(parseInt(id), product, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted', type: Product })
  async delete(
    @Param('id') id: string,
    @User() user: UserDocument,
  ): Promise<Product> {
    const { id: userId } = user;
    return await this.productService.delete(parseInt(id), userId);
  }
}