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
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let RegistrationController = class RegistrationController {
    constructor(/** @repository decorate injects an instance of our repository whenever a request is being handled */ userRepo) {
        this.userRepo = userRepo;
    } /** a new instance of model is created with each request */
    /** handler functions  */
    async registerNewUser(user // associates the API with the body of the request to validate its format
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
        // else
        let newUser = await this.userRepo.create(user); //create new instance of model and save to database
        return newUser; // create function is provided by our repository
    }
};
__decorate([
    rest_1.post("/registration") // creates metadata for the rest api so it can redirect requests
    ,
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User // associates the API with the body of the request to validate its format
    ]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "registerNewUser", null);
RegistrationController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], RegistrationController);
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map