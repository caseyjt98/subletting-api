import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { sign, verify } from 'jsonwebtoken';

export class LoginController {
  constructor(
    @repository(UserRepository) protected userRepo: UserRepository,
  ) { }


  // we can pass in our jwt to functions and instantly have our user information
  // but we dont want the password accessible
  @get("/verify")
  verifyToken(@param.query.string("jwt") jwt: string) {
    try {
      // verify fnc takes the token, checks that it was generated with the right password (second param), and verifies
      let payload = verify(jwt, "shh")    // second param should match "shh" ( secret keys should match.. if its not, it will throw an error
      return payload;
    }
    catch (err) {
      throw new HttpErrors.Unauthorized("Invalid Token");
    }
  }
  // the user is authenticated and we can process...

  // in order to login, you have to make a post request
  @post('/login')
  async loginUser(@requestBody() user: User) {
    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email },
        { password: user.password },
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let foundUser = await this.userRepo.findOne({
      where: {
        and: [
          { email: user.email },
          { password: user.password }
        ],
      },
    }) as User;

    let jwt = sign({
      user: {
        id: foundUser.id,
        email: foundUser.email
      }
    },
      "shh",
      {
        issuer: "auth.ix.com",
        audience: "ix.com"
      });

    return {
      token: jwt
    };
  }
}

// decoding our token gives us the user, issuer, audience

