module.exports = {
  can: (instance, operations) => Object.assign(instance, operations),

  decrementSellIn: item => item.sellIn--,

  decrementQuality: (item) => {
    if (item.quality > 0) {
      item.quality--;
    }
  },

  incrementQuality: (item) => {
    if (item.quality < 50) {
      item.quality++;
    }
  }
}