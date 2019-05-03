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

module.exports = Sulfuras;