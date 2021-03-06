/** repository is the layer between the model class definitions and their ability to perform CRUD operations */

import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { inject } from '@loopback/core';
import { User } from '../models/user';

/** use DefaultCrudRepository as base class to start us off with basic CRUD methods */
export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id>

{
  constructor(@inject('datasources.db') protected datasource: juggler.DataSource) {
    super(User, datasource); /** inject data source so that this repository can connect to it when performing data operations */
  }
}
