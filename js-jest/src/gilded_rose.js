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

class BackstagePasses {
  setNextLink(updater) {
    this.nextLink = updater;

    return updater;
  }

  tick(item) {

    if (this.isNotBackstagePasses(item)) {
      return this.nextLink.tick(item);
    }

    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
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
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
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

    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
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

    this.chain = new UpdateChain([new Sulfuras, new BackstagePasses, new AgedBrie, new StoreItem]);
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
