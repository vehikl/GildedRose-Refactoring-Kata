class UpdateChain {
    constructor(updaters) {
      this.root = updaters[0];
      this.setLinks(updaters.slice(1));
    }
  
    setLinks(updaters) {
      updaters.reduce((lastUpdater, updater) => lastUpdater.setNextLink(updater), this.root)
    }
  
    tick(item) {
      return this.root.tick(item);
    }
  }

  module.exports = UpdateChain;