var {Shop, Item} = require('../src/gilded_rose.js');
const _ = require('lodash');

describe("Gilded Rose", function() {

  const names = [
    'foo',
    'Aged Brie',
    'Backstage passes to a TAFKAL80ETC concert',
    'Sulfuras, Hand of Ragnaros'
  ];

  const sellIns = [-1, 0, 1, 5, 6, 7, 10, 11, 12];

  const qualities = [0, 1, 49, 50, 51];

  function cartesianProductOf() {
    return _.reduce(arguments, function(a, b) {
        return _.flatten(_.map(a, function(x) {
            return _.map(b, function(y) {
                return x.concat([y]);
            });
        }), true);
    }, [ [] ]);
  }

  it.each(cartesianProductOf(names, sellIns, qualities))("should foo", function(name, sellIn, quality) {
    const gildedRose = new Shop([ new Item(name, sellIn, quality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toMatchSnapshot();
  });

});
