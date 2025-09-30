import { User as UserDocument } from '../types/user';
import { UserService } from './user.service';
import { UpdateUserDTO } from 'src/auth/auth.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(user: UserDocument): Promise<{
        id: number;
        username: string;
        password: string;
        seller: boolean;
        created: Date;
    }>;
    update(user: UserDocument, userData: UpdateUserDTO): Promise<{
        id: number;
        username: string;
        seller: boolean;
        admin: boolean;
        created: Date;
    }>;
}
