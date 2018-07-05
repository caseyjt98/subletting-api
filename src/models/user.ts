import { model, property, Entity } from "@loopback/repository";


@model({
  name: "user"    // maps to SQL table name, the table is called 'user'
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
  firstName: string;

  @property({
    type: "string"
  })
  lastName: string;

  @property({
    type: "string",
    required: true,
  })
  registeredEmail: string;

  @property({
    type: "string",
    required: true,
  })
  password: string;

  @property({
    type: "number",
    required: true
  })
  age: number;

  getId() {
    return this.id;
  }

}
