import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";
export declare class RegistrationController {
    /** @repository decorate injects an instance of our repository whenever a request is being handled */ protected userRepo: UserRepository;
    constructor(/** @repository decorate injects an instance of our repository whenever a request is being handled */ userRepo: UserRepository);
    /** handler functions  */
    registerNewUser(user: User): Promise<{
        token: string;
    }>;
}
