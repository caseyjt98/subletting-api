import { Entity } from "@loopback/repository";
export declare class User extends Entity {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    age: number;
    getId(): number;
}
