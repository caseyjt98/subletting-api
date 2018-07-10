import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';
import { HttpErrors, get, param } from '@loopback/rest';
import { sign, verify } from 'jsonwebtoken';

export class UserController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }


  @get("/users")
  async getAllUsers(): Promise<Array<User>> {
    var users = new Array<User>();
    return await this.userRepo.find();  /** find all instances of the model that match filter parameter */
  }


  @get("/users/{id}")
  async getUserById(@param.path.number('id') id: number): Promise<User> {
    // Check for valid ID
    let userExists: boolean = !!(await this.userRepo.count({ id }));

    if (!userExists) {
      throw new HttpErrors.BadRequest('user ID ${id} does not exist');
    }
    return await this.userRepo.findById(id);
  }


}
