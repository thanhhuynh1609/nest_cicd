import { Product } from '../entities/product.entity';
import { User as UserDocument } from '../entities/user.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    listAll(): Promise<Product[]>;
    searchProducts(title: string): Promise<Product[]>;
    listMine(user: UserDocument): Promise<Product[]>;
    listBySeller(id: string): Promise<Product[]>;
    create(product: CreateProductDTO, user: UserDocument): Promise<Product>;
    read(id: string): Promise<Product>;
    update(id: string, product: UpdateProductDTO, user: UserDocument): Promise<Product>;
    delete(id: string, user: UserDocument): Promise<Product>;
}
