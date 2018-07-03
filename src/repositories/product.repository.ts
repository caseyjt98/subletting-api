/** repository is the layer between the model class definitions and their ability to perform CRUD operations */

import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { inject } from '@loopback/core';
import { Product } from '../models/product';

/** use DefaultCrudRepository as base class to start us off with basic CRUD methods */
export class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype.id>

{
  constructor(@inject('datasources.db') protected datasource: juggler.DataSource) {
    super(Product, datasource); /** inject data source so that this repository can connect to it when performing data operations */
  }
}
