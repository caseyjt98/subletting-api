/** controllers handle the request- response cycles of the API, using @post, @get, etc requests */
/** decorators set up the routing as well as the expected params of incoming requests */


import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";


// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor( /** @repository decorate injects an instance of our repository whenever a request is being handled */
    @repository(UserRepository.name) private registrationRepo: UserRepository,
  ) { } /** a new instance of model is created with each request */


  /** handler functions  */
  @post("/registration")      /** creates metadata for the rest api so it can redirect requests */
  async registerNewUser(
    @requestBody() user: User   /** associates the API with the body of the request to validate its format */
  ): Promise<User> {
    let newUser = await this.registrationRepo.create(user); /** create new instance of model and save to database */
    return newUser;                                          /** create function is provided by our repository */

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








