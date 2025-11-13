export interface Category {
    id: number
    name: string
    image: string
}

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: Category | string | number
    image?: string
    images?: string[]
}

export interface User {
    id: number;
    name: string;
    role: string;
    email: string;
    password?: string;
    avatar?: string;
}
