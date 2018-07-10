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
let LoginController = class LoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    // we can pass in our jwt to functions and instantly have our user information
    // but we dont want the password accessible
    verifyToken(jwt) {
        try {
            // verify fnc takes the token, checks that it was generated with the right password (second param), and verifies
            let payload = jsonwebtoken_1.verify(jwt, "shh"); // second param should match "shh" ( secret keys should match.. if its not, it will throw an error
            return payload;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid Token");
        }
    }
    // the user is authenticated and we can process...
    // in order to login, you have to make a post request
    async loginUser(user) {
        // Check that email and password are both supplied
        if (!user.email || !user.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email and password are valid
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email },
                { password: user.password },
            ],
        }));
        if (!userExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        let foundUser = await this.userRepo.findOne({
            where: {
                and: [
                    { email: user.email },
                    { password: user.password }
                ],
            },
        });
        let jwt = jsonwebtoken_1.sign({
            user: {
                id: foundUser.id,
                email: foundUser.email
            }
        }, "shh", {
            issuer: "auth.ix.com",
            audience: "ix.com"
        });
        return {
            token: jwt
        };
    }
};
__decorate([
    rest_1.get("/verify"),
    __param(0, rest_1.param.query.string("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "verifyToken", null);
__decorate([
    rest_1.post('/login'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "loginUser", null);
LoginController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], LoginController);
exports.LoginController = LoginController;
// decoding our token gives us the user, issuer, audience
//# sourceMappingURL=login.controller.js.map