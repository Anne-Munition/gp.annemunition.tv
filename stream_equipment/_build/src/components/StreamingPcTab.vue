<template>
  <div class="container">
    <div v-for="item in items" :key="item.name">
      {{ item.name }}
      <a :href="item.url">
        <v-img :src="item.image" :style="getStyle(item)"></v-img>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {streamingPc} from '@/equipment/streaming_pc';
import {computed} from 'vue';

const items = computed<Item[]>(() => {
  const array = [];
  for (const key in streamingPc) {
    const i = streamingPc[key];
    if (Array.isArray(i)) {
      for (const iKey in i) {
        array.push(i[iKey]);
      }
    } else {
      array.push(streamingPc[key]);
    }
  }
  return array;
})

function getStyle(item: Item): string {
  return `
position: absolute;
top: ${item.posY}px;
left: ${item.posX}px;
height: ${item.height}px;
`
}
</script>

<style scoped>
.container {
    position: relative;
    height: 800px;
    width: 100%;
}
</style>
