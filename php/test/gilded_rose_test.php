<?php

require_once 'gilded_rose.php';

class GildedRoseTest extends PHPUnit\Framework\TestCase
{
    use \Spatie\Snapshots\MatchesSnapshots;

    function testFoo()
    {
        $items = [
            new Item('+5 Dexterity Vest', 10, 20),
            new Item('Aged Brie', 2, 0),
            new Item('Elixir of the Mongoose', 5, 7),
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
        ];
        $gildedRose = new GildedRose($items);
        for ($i = 1; $i <= 365; $i++) {
            $gildedRose->update_quality();
            $this->assertMatchesSnapshot(array_map(function (Item $item) {
                return $item->__toString();
            }, $items));
        }
    }

}
