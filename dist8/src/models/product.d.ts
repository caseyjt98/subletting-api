import { Entity } from "@loopback/repository";
export declare class Product extends Entity {
    id: number;
    addressNumber: number;
    streetName: string;
    city: string;
    zipCode: number;
    apartmentNumber: number;
    subleaserId: number;
    getId(): number;
}
