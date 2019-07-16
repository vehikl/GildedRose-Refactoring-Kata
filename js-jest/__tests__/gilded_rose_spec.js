
const _ = require('lodash');
const { Shop, Item } = require('../src/gilded_rose.js');

describe('Gilded Rose', () => {
  const names = [
    'foo',
    'Aged Brie',
    'Backstage passes to a TAFKAL80ETC concert',
    'Sulfuras, Hand of Ragnaros',
  ];

  const sellIns = [-1, 0, 1, 5, 6, 7, 10, 11, 12];

  const qualities = [0, 1, 49, 50, 51];

  function cartesianProductOf() {
    return _.reduce(arguments, (a, b) => _.flatten(_.map(a, x => _.map(b, y => x.concat([y]))), true), [[]]);
  }

  it.each(cartesianProductOf(names, sellIns, qualities))('should foo', (name, sellIn, quality) => {
    const gildedRose = new Shop([new Item(name, sellIn, quality)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toMatchSnapshot();
  });
});
