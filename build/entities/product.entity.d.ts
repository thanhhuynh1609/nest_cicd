import { User } from './user.entity';
export declare class Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    owner: User;
    created: Date;
    updated: Date;
}
