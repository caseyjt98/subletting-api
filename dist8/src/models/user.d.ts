import { Entity } from "@loopback/repository";
export declare class User extends Entity {
    id: number;
    firstName: string;
    lastName: string;
    registeredEmail: string;
    password: string;
    getId(): number;
}
