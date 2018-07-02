import { DefaultCrudRepository } from '@loopback/repository';
import { inject } from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Registration } from '../models/registration';

export class RegistrationRepository extends DefaultCrudRepository<Registration, typeof Registration.prototype.id>

{
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Registration, datasource);
  }
}
