const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", () => {
  it("decreases the sell in of an item", () => {
    const target = new Item("Any old item", 10, 10);
    new Shop([target]).updateQuality();

    expect(target.sellIn).toEqual(9);
  });

  it("decreases the quality of an item", () => {
    const target = new Item("Any old item", 10, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(9);
  });

  it("decreases the quality of an item twice as fast once sell in date has past", () => {
    const target = new Item("Any old item", 0, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(8);
  });

  it("does not decrease quality of an item beyond the minimum", () => {
    const target = new Item("Any old item", -1, 0);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(0);
  });

  it("increases the quality of aged brie", () => {
    const target = new Item("Aged Brie", 10, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(11);
  });

  it("increases the quality of aged brie twice as fast once sell in date has past", () => {
    const target = new Item("Aged Brie", -1, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(12);
  });

  it("does not increase quality of aged brie beyond the maximum", () => {
    const target = new Item("Aged Brie", -1, 50);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(50);
  });

  it("increases the quality of backstage passes", () => {
    const target = new Item("Backstage passes to a TAFKAL80ETC concert", 25, 10 );
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(11);
  });

  it("increases the quality by two of backstage passes when there are ten days or less", () => {
    const target = new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(12);
  });

  it("increases the quality by three of backstage passes when there are five days or less", () => {
    const target = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(13);
  });

  it("sets quality of backstage passes to zero after the concert", () => {
    const target = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(0);
  });

  it("does not decrease the sell in of sulfuras", () => {
    const target = new Item("Sulfuras, Hand of Ragnaros", -1, 10);
    new Shop([target]).updateQuality();

    expect(target.sellIn).toEqual(-1);
  });

  it("does not decrease the quality of sulfuras", () => {
    const target = new Item("Sulfuras, Hand of Ragnaros", 10, 10);
    new Shop([target]).updateQuality();

    expect(target.quality).toEqual(10);
  });
});
