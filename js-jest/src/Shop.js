const UpdateChain = require('./UpdateChain.js');
const AgedBrie = require('./AgedBrie.js');
const BackstagePasses = require('./BackstagePasses.js');
const StoreItem = require('./StoreItem.js');
const Sulfuras = require('./Sulfuras.js');

class Shop {
    constructor(items = []) {
        this.items = items;

        this.chain = new UpdateChain([
            new Sulfuras,
            new BackstagePasses,
            new AgedBrie,
            new StoreItem,
        ]);
    }
    updateQuality() {
        this.items.forEach(item => this.chain.tick(item));

        return this.items;
    }
}

module.exports = Shop;