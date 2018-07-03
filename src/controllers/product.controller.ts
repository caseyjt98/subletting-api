
import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { Product } from "../models/product";
import { repository } from "@loopback/repository";
import { ProductRepository } from "../repositories/Product.repository";


export class ProductController {
  constructor(
    @repository(ProductRepository) protected productRepo: ProductRepository,
  ) { }


  @get("/products")
  async getAllProducts(): Promise<Array<Product>> {
    var users = new Array<Product>();
    return await this.productRepo.find();
  }


  @get("/products/{id}")
  async getProductById(@param.path.number('id') id: number): Promise<Product> {
    // Check for valid ID
    let productExists: boolean = !!(await this.productRepo.count({ id }));

    if (!productExists) {
      throw new HttpErrors.BadRequest('product ID ${id} does not exist');
    }
    return await this.productRepo.findById(id);
  }


  @get("/products/{subleaserid}")
  async getProductBySubleaserId(@param.path.number('subleaserid') subleaserid: number): Promise<Product> {
    // Check for valid ID
    let productExists: boolean = !!(await this.productRepo.count({ subleaserid }));

    if (!productExists) {
      throw new HttpErrors.BadRequest('product ID ${subleaserid} does not exist');
    }
    return await this.productRepo.findById(subleaserid);
  }


  @post("/product")
  async newProduct(
    @requestBody() product: Product
  ): Promise<Product> {
    // check that required fields are supplied
    if (!product.addressNumber || !product.streetName || !product.city || !product.zipCode) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // check that user doesn't already exist
    let productExists: boolean = !!(await this.productRepo.count({ email: product.id }));
    if (productExists) {
      throw new HttpErrors.BadRequest('product already exists');
    }

    // else
    let newProduct = await this.productRepo.create(product);
    return newProduct;

  }



}
