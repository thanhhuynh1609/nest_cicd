import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findByOwner(userId: number): Promise<Product[]>;
    searchByName(title: string): Promise<Product[]>;
    findById(id: number): Promise<Product>;
    create(productDTO: CreateProductDTO, user: User): Promise<Product>;
    update(id: number, productDTO: UpdateProductDTO, userId: number): Promise<Product>;
    delete(id: number, userId: number): Promise<Product>;
    deleteByAdmin(id: string): Promise<{
        message: string;
    }>;
}
