/** controllers handle the request- response cycles of the API, using @post, @get, etc requests */
/** decorators set up the routing as well as the expected params of incoming requests */


import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';


export class RegistrationController {
  constructor( /** @repository decorate injects an instance of our repository whenever a request is being handled */
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { } /** a new instance of model is created with each request */


  /** handler functions  */

  // create post request to register new user
  @post("/registration")
  async registerNewUser(
    @requestBody() user: User   // tells swagger ui to reflect the properties of User model
  ) {

    // check that required fields are supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // check that user doesn't already exist
    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));
    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }


    // hash the user's password before creating user
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;


    // else
    let createdUser = await this.userRepo.create(user);      // creates new instance of model and save to database

    // once the user is verified, create a jwt token by signing
    let jwt = sign({
      // param 1: payload to sign, contains information about the user
      user: {
        id: createdUser.id,
        email: createdUser.email
        // not password
      }
    },
      "shh",
      {
        issuer: "auth.ix.com",
        audience: "ix.com"
      });

    return {
      token: jwt      // return jwt token in json format
    };
  }

  // now we can call npm start, manually register a user, and it will appear in our SQL database
}


