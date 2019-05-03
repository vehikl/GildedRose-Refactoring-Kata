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

module.exports = {
    decrementSellIn,
    decrementQuality,
    incrementQuality,
    can
}