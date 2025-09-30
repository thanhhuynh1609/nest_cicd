export declare class User {
    id: number;
    username: string;
    password: string;
    seller: boolean;
    admin: boolean;
    created: Date;
    hashPassword(): Promise<void>;
}
