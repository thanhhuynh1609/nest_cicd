import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO, UpdateUserDTO } from '../auth/auth.dto';
import { Payload } from '../types/payload';
import { User } from '../entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(userDTO: RegisterDTO): Promise<{
        id: number;
        username: string;
        seller: boolean;
        admin: boolean;
        created: Date;
    }>;
    findAll(): Promise<User[]>;
    findByLogin(userDTO: LoginDTO): Promise<{
        id: number;
        username: string;
        seller: boolean;
        admin: boolean;
        created: Date;
    }>;
    findByPayload(payload: Payload): Promise<User>;
    sanitizeUser(user: User): {
        id: number;
        username: string;
        seller: boolean;
        admin: boolean;
        created: Date;
    };
    delete(id: string): Promise<{
        message: string;
    }>;
    update(id: number, updateUserDTO: UpdateUserDTO): Promise<{
        id: number;
        username: string;
        seller: boolean;
        admin: boolean;
        created: Date;
    }>;
}
