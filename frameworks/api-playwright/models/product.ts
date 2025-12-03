import { Category } from "./category";

export type Product = {
    name: string;
    price: number;
    categories: Category[];
}