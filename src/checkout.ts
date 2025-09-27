import { Catalog } from "./services/catalog";
import { Cart } from "./models/cart";
import { Discount, PricingRule } from "./pricing/pricingRule";
import { formatCents } from "./utils/money";

export class Checkout {
    private cart: Cart;
    private catalog: Catalog;
    private rules: PricingRule[];

    constructor(pricingRules: PricingRule[], catalog?: Catalog) {
        this.catalog = catalog ?? new Catalog();
        this.cart = new Cart();
        this.rules = pricingRules ?? [];
    }

    scan(sku: string) {
        const product = this.catalog.getProduct(sku);
        if (!product) {
            throw new Error(`Unknown SKU ${sku}`);
        }
        this.cart.addProduct(product, 1, false);
    }

    private collectDiscounts(): Discount[] {
        const discounts: Discount[] = [];
        for (const r of this.rules) {
            const d = r.apply(this.cart);
            discounts.push(...d);
        }
        return discounts;
    }

    total(): string {
        const subtotal = this.cart.subtotalCents();
        const discounts = this.collectDiscounts();
        const totalDiscount = discounts.reduce((s, d) => s + d.amountCents, 0);
        const totalCents = Math.max(0, subtotal - totalDiscount);
        return formatCents(totalCents);
    }

    getSubtotalCents(): number {
        return this.cart.subtotalCents();
    }

    getDiscounts(): Discount[] {
        return this.collectDiscounts();
    }

    getLineItems() {
        return this.cart.getLineItems();
    }
}