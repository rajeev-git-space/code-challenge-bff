import { Product } from "../models/product";
import { cents } from "../utils/money"

const initialProducts: Product[] = [
    { sku: 'ipd', name: 'Super iPad', priceCents: cents(549.99) },
    { sku: 'mbp', name: 'MacBook Pro', priceCents: cents(1399.99) },
    { sku: 'atv', name: 'Apple TV', priceCents: cents(109.50) },
    { sku: 'vga', name: 'VGA adapter', priceCents: cents(30.0) }
];

export class Catalog {
    private products: Map<string, Product> = new Map();

    constructor(products: Product[] = initialProducts) {
        for (const p of products) {
            this.products.set(p.sku, p);
        }
    }

    getProduct(sku: string): Product | undefined {
        return this.products.get(sku);
    }
}