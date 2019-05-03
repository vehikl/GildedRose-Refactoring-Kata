const { can, decrementQuality, decrementSellIn } = require('./abilities.js');

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

can(StoreItem.prototype, { decrementQuality, decrementSellIn })

module.exports = StoreItem;