/** repository is the layer between the model class definitions and their ability to perform CRUD operations */
import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Product } from '../models/product';
/** use DefaultCrudRepository as base class to start us off with basic CRUD methods */
export declare class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
