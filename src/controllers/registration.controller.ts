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
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { } /** a new instance of model is created with each request */


  /** handler functions  */
  @post("/registration")      // creates metadata for the rest api so it can redirect requests
  async registerNewUser(
    @requestBody() user: User   // associates the API with the body of the request to validate its format
  ): Promise<User> {
    // check that required fields are supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // check that user doesn't already exist
    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));
    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    // else
    let newUser = await this.userRepo.create(user); //create new instance of model and save to database
    return newUser;                                          // create function is provided by our repository

  }

}
