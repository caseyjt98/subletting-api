import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Registration } from '../models/registration';
export declare class RegistrationRepository extends DefaultCrudRepository<Registration, typeof Registration.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
