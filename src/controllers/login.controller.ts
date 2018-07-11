import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export class LoginController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }

  // in order to login, make a post request
  @post('/login')
  async loginUser(@requestBody() user: User) {

    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('missing data');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        //{ password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let foundUser = await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          // { password: user.password }
        ],
      },
    }) as User;



    if (!await bcrypt.compare(user.password, foundUser.password)) {
      throw new HttpErrors.Unauthorized("Incorrect password");
    }



    // once the user is verified, create a jwt token by signing
    let jwt = sign({
      // param 1: payload to sign, contains information about the user
      user: {
        id: foundUser.id,
        email: foundUser.email
      }
    }, // param 2: secret key
      "shh",
      // param 3: options for the signature
      {
        issuer: "auth.ix.com",
        audience: "ix.com"
      });

    return {
      token: jwt      // return jwt token in json format
    };
  }

  // we can pass in our jwt to functions and instantly have our user information
  // but we dont want the password accessible

  // pass in jwt to verify
  @get("/verify")
  verifyToken(@param.query.string("jwt") jwt: string) {
    try {
      // verify fnc takes the token, checks that it was generated with the right secret key (second param), and verifies
      let payload = verify(jwt, "shh")    // second param should match "shh" ( secret keys should match.. )if its not, it will throw an error
      return payload;                     // payload will contain the decoded token (aka the information about the user stored in the token)
    }
    catch (err) {
      throw new HttpErrors.Unauthorized("Invalid Token");
    }
  }
  // the user is authenticated and we can process...

}



