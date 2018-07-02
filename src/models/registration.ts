import { model, property, Entity } from "@loopback/repository";
import { getDiffieHellman } from "crypto";

@model({
  name: "registration"
})

export class Registration extends Entity {

  @property({
    type: "number",
    id: true
  })
  id: number;

  @property({
    type: "string"
  })
  name: string;

  @property({
    type: "string"
  })
  registeredEmail: string;


  getId() {
    return this.id;
  }

}
