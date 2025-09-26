import { PricingRule, Discount } from "../pricingRule";
import { Cart } from "../../models/cart";
import { Catalog } from "../../services/catalog";

export class BulkPriceRule implements PricingRule {
    id: string;
    priority: number;
    sku: string;
    minQty: number;
    newPriceCents: number;
    private catalog: Catalog;

    constructor(id: string, catalog: Catalog, sku: string, minQty: number, newPriceCents: number, priority: 100) {
        this.id = id;
        this.catalog = catalog;
        this.sku = sku;
        this.minQty = minQty;
        this.newPriceCents = newPriceCents;
        this.priority = priority;
    }

    apply(cart: Cart): Discount[] {
        const qty = cart.getQuantity(this.sku);
        if(qty < this.minQty) return [];

        const product = this.catalog.getProduct(this.sku);
        if(!product) return [];

        const oldSubtotal = product.priceCents * qty;
        const newSubtotal = this.newPriceCents * qty;
        const discountAmount = oldSubtotal - newSubtotal;

        if (discountAmount <= 0) return [];

        return [{
            description: `Bulk price for ${this.sku} when quantity >= ${this.minQty}`,
            amountCents: discountAmount,
            sku: this.sku
        }]
    }
}