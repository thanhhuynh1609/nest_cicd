import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['owner'] });
  }

  async findByOwner(userId: number): Promise<Product[]> {
    return await this.productRepository.find({ 
      where: { owner: { id: userId } },
      relations: ['owner'] 
    });
  }

  async searchByName(title: string): Promise<Product[]> {
    try {
      if (!title) {
        return [];
      }
      return await this.productRepository.find({
        where: { title: Like(`%${title}%`) },
        relations: ['owner']
      });
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['owner']
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NO_CONTENT);
    }
    return product;
  }

  async create(productDTO: CreateProductDTO, user: User): Promise<Product> {
    const product = this.productRepository.create({
      ...productDTO,
      owner: user,
    });
    return await this.productRepository.save(product);
  }

  async update(id: number, productDTO: UpdateProductDTO, userId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['owner']
    });
    
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (product.owner.id !== userId) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.productRepository.update(id, productDTO);
    return await this.findById(id);
  }

  async delete(id: number, userId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['owner']
    });
    
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (product.owner.id !== userId) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.productRepository.remove(product);
    return product;
  }

  async deleteByAdmin(id: string) {
    const productId = parseInt(id);
    
    // Tìm product trước
    const product = await this.productRepository.findOne({ id: productId });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    // Xóa tất cả OrderProduct references trước
    await this.productRepository.manager.query(
      'DELETE FROM order_product WHERE "productId" = $1', 
      [productId]
    );

    // Sau đó xóa product
    await this.productRepository.delete(productId);
    return { message: 'Product deleted successfully' };
  }
}




