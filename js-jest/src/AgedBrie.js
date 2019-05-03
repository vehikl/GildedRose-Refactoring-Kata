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

  module.exports = AgedBrie;