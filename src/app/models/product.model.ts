export interface Category {
    id: string;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    description: string;
    category: Category;
    creationAt: string;
    updatedAt: string;
}