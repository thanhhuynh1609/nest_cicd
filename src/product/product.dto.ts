import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';  // Thêm import này cho Partial

export class CreateProductDTO {  // Chuyển từ interface sang class
  @ApiProperty({ description: 'Product title', example: 'iPhone 15' })
  title: string;

  @ApiProperty({ description: 'Product image URL', example: 'https://example.com/image.jpg' })
  image: string;

  @ApiProperty({ description: 'Product description', example: 'A great smartphone' })
  description: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  price: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}  // Dùng PartialType để tạo partial class