import type { AxiosInstance } from "axios";
import type { Product } from "@/types";
import type { Readable, Creatable, Editable, Deletable } from "@/services/types";
import { ProductModel } from "@/models/product.model";

export class ProductService implements Readable<Product>, Creatable<Product>, Editable<Product>, Deletable<Product> {

    constructor(public httpClient: AxiosInstance) {
    }

    /**
     * Get all products
     * @param params
     */
    async get(params?: any): Promise<Product[]> {
        const response = await this.httpClient.get<Product[]>('/products', { params });
        return response.data.map((product) => new ProductModel(product));
    }

    /**
     * Get product by id
     * @param id
     */
    async getById(id: number): Promise<Product> {
        const response = await this.httpClient.get<Product>(`/products/${id}`);
        return new ProductModel(response.data);
    }

    /**
     * Create new product
     * @param data
     */
    async create(data: Product): Promise<Product> {
        const response = await this.httpClient.post<Product>('/products', data);
        return new ProductModel(response.data);
    }

    /**
     * Update product by id
     * @param id
     * @param data
     */
    async update(id: number, data: Product): Promise<Product> {
        const response = await this.httpClient.put<Product>(`/products/${id}`, data);
        return new ProductModel(response.data);
    }

    /**
     * Delete product by id
     * @param id
     */
    async delete(id: number): Promise<Product> {
        const response = await this.httpClient.delete<Product>(`/products/${id}`);
        return new ProductModel(response.data);
    }
}
