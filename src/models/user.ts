import { model, property, Entity } from "@loopback/repository";
import { getDiffieHellman } from "crypto";

@model({
  name: "user"
})

export class User extends Entity {

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

  @property({
    type: "string"
  })
  password: string;

  getId() {
    return this.id;
  }

}
