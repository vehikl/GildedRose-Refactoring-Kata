import { shallowMount } from '@vue/test-utils';
import GildedRose from '@/components/GildedRose.vue';

describe('GildedRose.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(GildedRose);
    expect(wrapper.exists()).toBe(true);
  });
});
