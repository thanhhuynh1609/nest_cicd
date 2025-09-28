import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { 
    cascade: ['remove'], 
    onDelete: 'CASCADE' 
  })
  products: OrderProduct[];

  @Column({ default: 'pending' })
  trangThai: string;

  @Column('decimal', { default: 0 })
  tongTien: number;

  @CreateDateColumn()
  created: Date;
}

