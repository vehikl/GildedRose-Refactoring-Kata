const UpdateChain = require('./UpdateChain.js');
const AgedBrie = require('./AgedBrie.js');
const BackstagePasses = require('./BackstagePasses.js');
const StoreItem = require('./StoreItem.js');
const Sulfuras = require('./Sulfuras.js');
const { can, decrementQuality, incrementQuality, decrementSellIn } = require('./abilities');

class Shop {
    constructor(items = []) {
        this.items = items;

        this.chain = new UpdateChain([
            new Sulfuras,
            can(new BackstagePasses, { decrementSellIn, incrementQuality }),
            can(new AgedBrie, { decrementSellIn, incrementQuality }),
            can(new StoreItem, { decrementSellIn, decrementQuality })
        ]);
    }
    updateQuality() {
        this.items.forEach(item => this.chain.tick(item));

        return this.items;
    }
}

module.exports = Shop;