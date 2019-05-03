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

module.exports = StoreItem;