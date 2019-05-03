class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class UpdateChain {
  constructor(updaters) {
    this.root = updaters[0];
    updaters.slice(1).reduce((lastUpdater, updater) => lastUpdater.setNextLink(updater), this.root);
  }

  tick(item) {
    return this.root.tick(item);
  }
}

const decrementSellIn = item => item.sellIn--;
const incrementQuality = (item) => {
  if (item.quality < 50) {
    item.quality++;
  }
}
const decrementQuality = (item) => {
  if (item.quality > 0) {
    item.quality--;
  }
}

function can(instance, operations) {
  return Object.assign(instance, operations);
}

class BackstagePasses {
  setNextLink(updater) {
    this.nextLink = updater;

    return updater;
  }

  tick(item) {

    if (this.isNotBackstagePasses(item)) {
      return this.nextLink.tick(item);
    }

    this.incrementQuality(item);

    if (item.sellIn < 11) {
      this.incrementQuality(item);
    }

    if (item.sellIn < 6) {
      this.incrementQuality(item);
    }

    this.decrementSellIn(item);

    if (item.sellIn < 0) {
      this.setQualityToZero(item);
    }
  }

  setQualityToZero(item) {
    item.quality = 0;
  }

  isNotBackstagePasses(item) {
    return item.name != 'Backstage passes to a TAFKAL80ETC concert';
  }
}

class StoreItem {
  setNextLink(updater) {
    this.nextLink = updater;

    return updater;
  }

  tick(item) {
    this.decrementQuality(item);

    this.decrementSellIn(item);

    if (item.sellIn < 0) {
      this.decrementQuality(item);
    }
  }
}

class AgedBrie {
  setNextLink(updater) {
    this.nextLink = updater;

    return updater;
  }

  tick(item) {
    if (this.isNotAgedBrie(item)) {
      return this.nextLink.tick(item)
    }

    this.incrementQuality(item);

    this.decrementSellIn(item);

    if (item.sellIn < 0) {
      this.incrementQuality(item);
    }
  }

  isNotAgedBrie(item) {
    return item.name != 'Aged Brie'
  }
}

class Sulfuras {
  setNextLink(updater) {
    this.nextLink = updater;

    return updater;
  }

  tick(item) {
    if (this.isNotSulfuras(item)) {
      return this.nextLink.tick(item);
    }
  }

  isNotSulfuras(item) {
    return item.name != 'Sulfuras, Hand of Ragnaros';
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;

    this.chain = new UpdateChain([
      new Sulfuras,
      can(new BackstagePasses, { decrementSellIn, incrementQuality }),
      can(new AgedBrie, { decrementSellIn, incrementQuality }),
      can(new StoreItem, { decrementSellIn, decrementQuality })
    ]);
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.chain.tick(item);
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
