const unless = (predicate, fn) => {
  return (item) => {
    if (predicate(item)) {
      return;
    }

    return fn(item);
  }
}

module.exports = {
  can: (instance, operations) => Object.assign(instance, operations),

  decrementSellIn: item => item.sellIn--,

  decrementQuality: unless(item => item.quality <= 0, item => item.quality--),

  incrementQuality: unless(item => item.quality >= 50, item => item.quality++)
}