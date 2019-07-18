<template>
  <div>
    <h3>Gilded Rose</h3>

    <div>
      name: <input type="text" v-model="item.name">
      sellIn: <input type="text" v-model="item.sellIn">
      quality: <input type="text" v-model="item.quality">
      <button @click="handler">add item</button>

      <div>
        items:
        <pre>{{items}}</pre>
      </div>
    </div>

    <button @click="handler2">Create store</button>
    <button @click="handler3">updateQuality</button>
  </div>
</template>

<script>
import { Shop, Item } from '@/gilded_rose';

export default {
  name: 'GildedRose',
  data() {
    return {
      item: {},
      items: [],
      gildedRose: null
    }
  },
  methods: {
    handler() {
      this.items.push({...this.item});
    },
    handler2() {
      this.gildedRose = new Shop(this.items);
    },
    handler3() {
      this.items = this.gildedRose.updateQuality();
    },
  }
};
</script>
