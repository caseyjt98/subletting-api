import { Entity } from "@loopback/repository";
export declare class User extends Entity {
    id: number;
    name: string;
    registeredEmail: string;
    password: string;
    getId(): number;
}
