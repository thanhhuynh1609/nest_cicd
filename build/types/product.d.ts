import { User } from './user';
export interface Product {
    id: number;
    owner: User;
    title: string;
    image: string;
    description: string;
    price: number;
    created: Date;
}
