import { Registration } from "../models/registration";
import { RegistrationRepository } from "../repositories/registration.repository";
export declare class RegistrationController {
    private registrationRepo;
    constructor(registrationRepo: RegistrationRepository);
    createRegistration(registration: Registration): Promise<Registration>;
}
