import {CategoriesService} from "@/services/categories.service";
import {ProductService} from "@/services/product.service";
import {UserService} from "@/services/user.service";

import httpClient from "@/utils/http-client";


class ServiceProvider {
    /**
     * Service instances
     */
    serviceInstances: Record<string, any> = {};

    /**
     * Get categories service
     */
    getCategoriesService(): CategoriesService {
        if (!this.serviceInstances.categoriesService) {
            this.serviceInstances.categoriesService = new CategoriesService(httpClient);
        }
        return this.serviceInstances.categoriesService;
    }

    /**
     * Get product service
     */
    getProductService(): ProductService {
        if (!this.serviceInstances.productService) {
            this.serviceInstances.productService = new ProductService(httpClient);
        }
        return this.serviceInstances.productService;
    }

    /**
     * Get user service
     */
    getUserService(): UserService {
        if (!this.serviceInstances.userService) {
            this.serviceInstances.userService = new UserService(httpClient);
        }
        return this.serviceInstances.userService;
    }

    /**
     * Set service instance
     * @param serviceName
     * @param serviceInstance
     */
    setServiceInstance(serviceName: string, serviceInstance: any): void {
        this.serviceInstances[serviceName] = serviceInstance;
    }

    /**
     * Check if service instance exists
     * @param serviceName
     */
    hasServiceInstance(serviceName: string): boolean {
        return !!this.serviceInstances[serviceName];
    }
}

const serviceProvider: ServiceProvider = new ServiceProvider();
export default serviceProvider;
