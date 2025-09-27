import { Cart } from "../models/cart";

export interface Discount {
    description: string;
    amountCents: number;
    sku?: string;
}

export interface PricingRule {
    id: string;
    priority?: number;
    apply(cart: Cart): Discount[];
}