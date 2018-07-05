"use strict";
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
const product_1 = require("../models/product");
const repository_1 = require("@loopback/repository");
const Product_repository_1 = require("../repositories/Product.repository");
let ProductController = class ProductController {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async getAllProducts() {
        var users = new Array();
        return await this.productRepo.find();
    }
    async getProductById(id) {
        // Check for valid ID
        let productExists = !!(await this.productRepo.count({ id }));
        if (!productExists) {
            throw new rest_1.HttpErrors.BadRequest('product ID ${id} does not exist');
        }
        return await this.productRepo.findById(id);
    }
    async getProductBySubleaserId(subleaserid) {
        // Check for valid ID
        let productExists = !!(await this.productRepo.count({ subleaserid }));
        if (!productExists) {
            throw new rest_1.HttpErrors.BadRequest('product ID ${subleaserid} does not exist');
        }
        return await this.productRepo.findById(subleaserid);
    }
    async newProduct(product) {
        // check that required fields are supplied
        if (!product.addressNumber || !product.streetName || !product.city || !product.zipCode) {
            throw new rest_1.HttpErrors.BadRequest('missing data');
        }
        // check that user doesn't already exist
        let productExists = !!(await this.productRepo.count({ email: product.id }));
        if (productExists) {
            throw new rest_1.HttpErrors.BadRequest('product already exists');
        }
        // else
        let newProduct = await this.productRepo.create(product);
        return newProduct;
    }
};
__decorate([
    rest_1.get("/products"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    rest_1.get("/products/{id}"),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    rest_1.get("/products/{subleaserid}"),
    __param(0, rest_1.param.path.number('subleaserid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductBySubleaserId", null);
__decorate([
    rest_1.post("/product"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_1.Product]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "newProduct", null);
ProductController = __decorate([
    __param(0, repository_1.repository(Product_repository_1.ProductRepository)),
    __metadata("design:paramtypes", [Product_repository_1.ProductRepository])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map