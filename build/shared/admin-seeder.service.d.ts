import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AdminSeederService {
    private userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    seedAdmin(): Promise<void>;
}
