import { UserService } from '../shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(userDTO: LoginDTO): Promise<{
        user: {
            id: number;
            username: string;
            seller: boolean;
            admin: boolean;
            created: Date;
        };
        token: string;
    }>;
    register(userDTO: RegisterDTO): Promise<{
        user: {
            id: number;
            username: string;
            seller: boolean;
            admin: boolean;
            created: Date;
        };
        token: string;
    }>;
}
