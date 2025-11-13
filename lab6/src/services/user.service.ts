import type { AxiosInstance } from "axios";
import type { User } from "@/types";
import type { Readable, Creatable, Editable, Deletable } from "@/services/types";
import { UserModel } from "@/models/user.model";

export class UserService implements Readable<User>, Creatable<User>, Editable<User>, Deletable<User> {

    constructor(public httpClient: AxiosInstance) {
    }

    /**
     * Get all users
     * @param params
     */
    async get(params?: any): Promise<User[]> {
        const response = await this.httpClient.get<User[]>('/users', { params });
        return response.data.map((user) => new UserModel(user));
    }

    /**
     * Get user by id
     * @param id
     */
    async getById(id: number): Promise<User> {
        const response = await this.httpClient.get<User>(`/users/${id}`);
        return new UserModel(response.data);
    }

    /**
     * Create new user
     * @param data
     */
    async create(data: User): Promise<User> {
        const response = await this.httpClient.post<User>('/users', data);
        return new UserModel(response.data);
    }

    /**
     * Update user by id
     * @param id
     * @param data
     */
    async update(id: number, data: User): Promise<User> {
        const response = await this.httpClient.put<User>(`/users/${id}`, data);
        return new UserModel(response.data);
    }

    /**
     * Delete user by id
     * @param id
     */
    async delete(id: number): Promise<User> {
        const response = await this.httpClient.delete<User>(`/users/${id}`);
        return new UserModel(response.data);
    }
}
