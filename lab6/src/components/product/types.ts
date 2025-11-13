import type {Product} from "@/types";

export interface ProductCardProps {
    item?: Product;
}

export interface ProductWrapperProps {
    items?: Product[];
    loading?: boolean;
}
