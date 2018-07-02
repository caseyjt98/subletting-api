import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { Registration } from "../models/registration";
import { repository } from "@loopback/repository";
import { RegistrationRepository } from "../repositories/registration.repository";


// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor(
    @repository(RegistrationRepository.name) private registrationRepo: RegistrationRepository,
  ) { }

  @post("/registrations")
  async createRegistration(
    @requestBody() registration: Registration
  ): Promise<Registration> {

    let createdRegistration = await this.registrationRepo.create(registration);
    return createdRegistration;

  }

}



