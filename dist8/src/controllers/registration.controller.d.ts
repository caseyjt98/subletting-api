import { User } from "../models/user";
import { RegistrationRepository } from "../repositories/registration.repository";
export declare class RegistrationController {
    private registrationRepo;
    constructor(registrationRepo: RegistrationRepository);
    registerNewUser(user: User): Promise<User>;
    getAllUsers(): Promise<Array<User>>;
    findUserById(id: number): Promise<User>;
}
