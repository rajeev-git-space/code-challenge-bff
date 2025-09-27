import { expect } from 'chai';
import { Catalog } from '../services/catalog';
import { ruleFactory } from '../pricing/ruleFactory';
import { Checkout } from '../checkout';
import { cents } from '../utils/money';

describe('Checkout integration tests', () => {
  let catalog: Catalog;
  let rules: any[];

  beforeEach(() => {
    catalog = new Catalog();
    rules = ruleFactory(catalog, [
      { type: 'offer', id: 'atv-offer', sku: 'atv', x: 3, y: 2 },
      { type: 'bulkPrice', id: 'ipd-bulk', sku: 'ipd', minQty: 5, priceCents: cents(499.99) }
    ]);
  });

  it('scenario 1: atv, atv, atv, vga => $249.00', () => {
    const co = new Checkout(rules, catalog);
    ['atv', 'atv', 'atv', 'vga'].forEach(sku => co.scan(sku));
    expect(co.total()).to.equal('$249.00');
  });

  it('scenario 2: atv, ipd, ipd, atv, ipd, ipd, ipd => $2718.95', () => {
    const co = new Checkout(rules, catalog);
    ['atv', 'ipd', 'ipd', 'atv', 'ipd', 'ipd', 'ipd'].forEach(sku => co.scan(sku));
    expect(co.total()).to.equal('$2718.95');
  });

  it('no promos: mbp + vga => $1429.99', () => {
    const co = new Checkout([], catalog);
    co.scan('mbp');
    co.scan('vga');
    expect(co.total()).to.equal('$1429.99');
  });

  it('unknown SKU should throw', () => {
    const co = new Checkout([], catalog);
    expect(() => co.scan('unknown')).to.throw(/Unknown SKU/);
  });
});
