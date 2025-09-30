export interface Address {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}
export interface User {
    id: number;
    username: string;
    readonly password: string;
    seller: boolean;
    admin: boolean;
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
    created: Date;
}
