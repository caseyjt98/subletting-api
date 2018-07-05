import { Product } from "../models/product";
import { ProductRepository } from "../repositories/Product.repository";
export declare class ProductController {
    protected productRepo: ProductRepository;
    constructor(productRepo: ProductRepository);
    getAllProducts(): Promise<Array<Product>>;
    getProductById(id: number): Promise<Product>;
    getProductBySubleaserId(subleaserid: number): Promise<Product>;
    newProduct(product: Product): Promise<Product>;
}
