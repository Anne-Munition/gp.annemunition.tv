<template>
  <v-card v-if="item" :title="item.name">
    <v-card-subtitle>{{ price }}</v-card-subtitle>
    <v-card-text>
      <v-img :src="item.image"></v-img>
    </v-card-text>
    <v-card-actions>
      <span class="price"> {{ price }}</span>
      <v-spacer />
      <v-btn color="#edae15" variant="outlined" @click="openInNewTab(item.url)">
        View on Amazon
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import prices from '@/plugins/asin_price_lookup';

const props = defineProps<{
  item: Item | undefined;
}>();

const price = computed(() => {
  const priceObj = prices.value.find((x) => x.asin === props.item?.asin);
  return priceObj?.price || '$--.--';
});

function openInNewTab(url: string) {
  window.open(url, '_blank', 'noreferrer');
}
</script>

<style scoped>
.price {
  font-size: 2em;
}
</style>
