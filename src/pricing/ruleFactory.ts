import { PricingRule } from "./pricingRule";
import { Catalog } from "../services/catalog";
import { OfferRule } from "./rules/offerRule";
import { BulkPriceRule } from "./rules/bulkPriceRule";

type RuleConfig = any;

export const ruleFactory = (catalog: Catalog, configs: RuleConfig[]): PricingRule[] => {
    const rules: PricingRule[] = [];

    for (const c of configs) {
        if (c.type == 'offer') {
            rules.push(new OfferRule(c.id, catalog, c.sku, c.x, c.y, c.priority ?? 100));
        } else if (c.type == 'bulkPrice') {
            rules.push(new BulkPriceRule(c.id, catalog, c.sku, c.minQty, c.priceCents, c.priority ?? 100));
        } else {
            throw new Error(`Unknown rule type ${c.type} `);
        }
    }

    rules.sort((a,b) => (a.priority ?? 100) - (b.priority ?? 100));
    return rules;
}