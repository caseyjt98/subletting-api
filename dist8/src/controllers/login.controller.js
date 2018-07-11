"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const user_1 = require("../models/user");
const repository_1 = require("@loopback/repository");
const user_repository_1 = require("../repositories/user.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    // in order to login, make a post request
    async loginUser(user) {
        // Check that email and password are both supplied
        if (!user.email || !user.password) {
            throw new rest_1.HttpErrors.Unauthorized('missing data');
        }
        // Check that email and password are valid
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        let foundUser = await this.userRepo.findOne({
            where: {
                and: [
                    { email: user.email },
                ],
            },
        });
        if (!await bcrypt.compare(user.password, foundUser.password)) {
            throw new rest_1.HttpErrors.Unauthorized("Incorrect password");
        }
        // once the user is verified, create a jwt token by signing
        let jwt = jsonwebtoken_1.sign({
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
            token: jwt // return jwt token in json format
        };
    }
    // we can pass in our jwt to functions and instantly have our user information
    // but we dont want the password accessible
    // pass in jwt to verify
    verifyToken(jwt) {
        try {
            // verify fnc takes the token, checks that it was generated with the right secret key (second param), and verifies
            let payload = jsonwebtoken_1.verify(jwt, "shh"); // second param should match "shh" ( secret keys should match.. )if its not, it will throw an error
            return payload; // payload will contain the decoded token (aka the information about the user stored in the token)
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid Token");
        }
    }
};
__decorate([
    rest_1.post('/login'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginUser", null);
__decorate([
    rest_1.get("/verify"),
    __param(0, rest_1.param.query.string("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "verifyToken", null);
LoginController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map