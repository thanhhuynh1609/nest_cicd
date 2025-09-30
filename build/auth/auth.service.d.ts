import { UserService } from '../shared/user.service';
import { Payload } from '../types/payload';
import { LoginDTO } from '../auth/auth.dto';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    signPayload(payload: Payload): Promise<string>;
    validateUser(payload: Payload): Promise<import("../entities/user.entity").User>;
    login(loginDTO: LoginDTO): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            seller: boolean;
            admin: boolean;
            created: Date;
        };
    }>;
}
