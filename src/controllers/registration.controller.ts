import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { repository } from "@loopback/repository";
import { RegistrationRepository } from "../repositories/registration.repository";


// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor(
    @repository(RegistrationRepository.name) private registrationRepo: RegistrationRepository,
  ) { }

  @post("/registration")
  async registerNewUser(
    @requestBody() user: User
  ): Promise<User> {
    let newUser = await this.registrationRepo.create(user); /** create new instance of model and save to database */
    return newUser;

  }

  @get("/users")
  async getAllUsers(): Promise<Array<User>> {
    var users = new Array<User>();
    return await this.registrationRepo.find();  /** find all instances of the model that match filter parameter */
  }

  @get('/users/{id}')
  async findUserById(@param.path.number('id') id: number): Promise<User> {
    return await this.registrationRepo.findById(id); /** find instance of model by id */
  }

  @post("/login")
  async loginExistingUser(@param.path.number('id') id: number, @param.path.string('password') password: string): Promise<boolean> {

    var currentUser = await this.registrationRepo.findById(id);
    if (currentUser.password == password)
      return true;

    throw new HttpErrors.NotFound("Sorry, user not found");
  }


}








