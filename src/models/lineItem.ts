export interface LineItem {
    sku: string;
    name: string;
    unitPriceCents: number;
    qty: number;
    isPromo?: boolean;
}