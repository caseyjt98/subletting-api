"use strict";
/** controllers handle the request- response cycles of the API, using @post, @get, etc requests */
/** decorators set up the routing as well as the expected params of incoming requests */
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
let RegistrationController = class RegistrationController {
    constructor(/** @repository decorate injects an instance of our repository whenever a request is being handled */ userRepo) {
        this.userRepo = userRepo;
    } /** a new instance of model is created with each request */
    /** handler functions  */
    // create post request to register new user
    async registerNewUser(user // tells swagger ui to reflect the properties of User model
    ) {
        // check that required fields are supplied
        if (!user.email || !user.password) {
            throw new rest_1.HttpErrors.BadRequest('missing data');
        }
        // check that user doesn't already exist
        let userExists = !!(await this.userRepo.count({ email: user.email }));
        if (userExists) {
            throw new rest_1.HttpErrors.BadRequest('user already exists');
        }
        // hash the user's password before creating user
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        // else
        let createdUser = await this.userRepo.create(user); // creates new instance of model and save to database
        // once the user is verified, create a jwt token by signing
        let jwt = jsonwebtoken_1.sign({
            // param 1: payload to sign, contains information about the user
            user: {
                id: createdUser.id,
                email: createdUser.email
                // not password
            }
        }, "shh", {
            issuer: "auth.ix.com",
            audience: "ix.com"
        });
        return {
            token: jwt // return jwt token in json format
        };
    }
};
__decorate([
    rest_1.post("/registration"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User // tells swagger ui to reflect the properties of User model
    ]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "registerNewUser", null);
RegistrationController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], RegistrationController);
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map