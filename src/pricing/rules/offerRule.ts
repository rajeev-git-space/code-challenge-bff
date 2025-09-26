import { PricingRule, Discount } from "../pricingRule";
import { Cart } from "../../models/cart";
import { Catalog } from "../../services/catalog";

export class OfferRule implements PricingRule {
    id: string;
    priority: number;
    sku: string;
    x: number;
    y: number;
    private catalog: Catalog;

    constructor(id: string, catalog: Catalog, sku: string, x: number, y: number, priority = 100) {
        this.id = id;
        this.catalog = catalog;
        this.sku = sku;
        this.x = x;
        this.y = y;
        this.priority = priority;
    }

    apply(cart: Cart): Discount[] {
        const qty = cart.getQuantity(this.sku);
        if (qty < this.x) return [];

        const product = this.catalog.getProduct(this.sku);
        if (!product) return [];

        const groups = Math.floor(qty / this.x);
        const freeUnitsPerGroup = this.x - this.y;
        const freeUnits = groups * freeUnitsPerGroup;
        const discountAmount = freeUnits * product.priceCents;

        if (discountAmount <= 0) return [];

        return [{
            description: `${this.x} for ${this.y} offer on ${this.sku}: ${freeUnits} free`,
            amountCents: discountAmount,
            sku: this.sku
        }]
    }
}