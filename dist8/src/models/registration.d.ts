import { Entity } from "@loopback/repository";
export declare class Registration extends Entity {
    id: number;
    name: string;
    registeredEmail: string;
    getId(): number;
}
