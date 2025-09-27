import { LineItem } from './lineItem';
import { Product }  from './product';

export class Cart {
    private items: Map<string, LineItem> = new Map();

    addProduct(product: Product, qty = 1, isPromo = false) {
        const existing = this.items.get(product.sku);
        if (existing) {
            existing.qty += qty;
        }
        else {
            this.items.set(product.sku, {
                sku: product.sku,
                name: product.name,
                unitPriceCents: product.priceCents,
                qty,
                isPromo
            });
        }
    }

    getQuantity(sku: string): number {
        const li = this.items.get(sku);
        return li ? li.qty : 0;
    }

    getLineItems(): LineItem[] {
        return Array.from(this.items.values());
    }

    subtotalCents(): number {
        let total = 0;
        for (const li of this.items.values()){
            total += li.unitPriceCents * li.qty;
        }
        return total;
    }
}