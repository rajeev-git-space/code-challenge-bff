// import { Catalog } from "./services/catalog";
// import { ruleFactory } from "./pricing/ruleFactory";
// import { Checkout } from "./checkout";
// import { cents } from "./utils/money";

// const catalog = new Catalog();

// const configs = [
//     { type: 'offer', id: 'atv-offer', sku: 'atv', x: 3, y: 2 },
//     { type: 'bulkPrice', id: 'ipd-bulk', sku: 'ipd', minQty: 5, priceCents: cents(499.99) }
// ]

// const rules = ruleFactory(catalog, configs);
// const co = new Checkout(rules, catalog);

// ['atv', 'atv', 'atv', 'vga'].forEach(sku => co.scan(sku));
// console.log("subtotal:", co.getSubtotalCents());
// console.log('discounts:', co.getDiscounts());
// console.log("total:", co.total());

import { Catalog } from './services/catalog';
import { Checkout } from './checkout';
import { ruleFactory } from './pricing/ruleFactory';
import { cents } from './utils/money';

const catalog = new Catalog();

const pricingRules = ruleFactory(catalog, [
    { type: 'offer', id: 'atv-offer', sku: 'atv', x: 3, y: 2 },
    { type: 'bulkPrice', id: 'ipd-bulk', sku: 'ipd', minQty: 5, priceCents: cents(499.99) }
]);

const scenarios: { name: string, items: string[] }[] = [
    {
        name: 'Scenario 1: 3x ATV + 1 VGA',
        items: ['atv', 'atv', 'atv', 'vga']
    },
    {
        name: 'Scenario 2: Mixed cart with bulk iPad discount',
        items: ['atv', 'ipd', 'ipd', 'atv', 'ipd', 'ipd', 'ipd']
    },
    {
        name: 'Scenario 3: No promos (MBP + VGA)',
        items: ['mbp', 'vga']
    }
];

scenarios.forEach((scenario) => {
    console.log(`\n===== ${scenario.name} =====`);
    const co = new Checkout(pricingRules, catalog);

    scenario.items.forEach((sku) => {
        try {
            co.scan(sku);
        } catch (err) {
            console.error(`Error scanning SKU ${sku}:`, (err as Error).message);
        }
    });

    console.log('Subtotal (cents):', co.getSubtotalCents());
    console.log('Discounts:', co.getDiscounts());
    console.log('Total:', co.total());
});
