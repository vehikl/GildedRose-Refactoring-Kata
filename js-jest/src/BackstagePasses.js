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

  module.exports = BackstagePasses;