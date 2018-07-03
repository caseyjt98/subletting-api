import { model, property, Entity } from "@loopback/repository";

@model({
  name: "product"
})

export class Product extends Entity {

  @property({
    type: "number",
    id: true
  })
  id: number;

  @property({
    type: "number",
    required: true
  })
  addressNumber: number;

  @property({
    type: "string",
    required: true,
  })
  streetName: string;

  @property({
    type: "string",
    required: true,
  })
  city: string;

  @property({
    type: "number",
    required: true,
  })
  zipCode: number;

  @property({
    type: "number",
    required: false,
  })
  apartmentNumber: number;

  @property({
    type: "number"
  })
  subleaserId: number;

  getId() {
    return this.id;
  }

}
