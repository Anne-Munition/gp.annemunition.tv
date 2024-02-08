<template>
  <v-row>
    <v-col cols="3">
      <div v-for="item in items" :key="item.name">
        <v-icon :icon="`mdi-${item.icon}`"></v-icon>
        {{ item.name }}
      </div>
    </v-col>
    <v-col cols="6">
      <v-img class="pc" height="720" src="@/assets/images/streaming_pc/streaming_pc.png" />
    </v-col>
    <v-col cols="3">
      <v-card>
        <v-card-title>
          {{ selectedItem.name }}
          <v-spacer></v-spacer>
          ${{ selectedItemPrice }}
        </v-card-title>
        <v-card-subtitle class="type">{{ selectedItem.type }}</v-card-subtitle>
        <v-card-text style="height: 300px; background: white; border: 3px solid #121212">
          <v-img class="amazon-image" :src="selectedItem.image"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#FFD800" variant="outlined" @click="openInNewTab(selectedItem.url)">
            View on Amazon
            <template v-slot:prepend>
              <v-img src="@/assets/images/amazon_logo.svg"></v-img>
            </template>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-btn
    v-for="item in items"
    :key="item.name"
    density="compact"
    icon="mdi-plus"
    color="#FFD800"
    class="item-button"
    :style="getStyle(item)"
    :data="item.name"
    @click="selectButton(item)"
  />
</template>

<script setup lang="ts">
import { streamingPc } from '@/equipment/streaming_pc';
import { computed, ref } from 'vue';
import axios from 'axios';

const items = computed<Item[]>(() => {
  const array = [];
  for (const key in streamingPc) {
    const i = streamingPc[key];
    if (Array.isArray(i)) {
      for (const iKey in i) {
        array.push({ type: key, ...i[iKey] });
      }
    } else {
      array.push({ type: key, ...streamingPc[key] });
    }
  }
  return array;
});

const selectedItem = ref(items.value[0]);
const selectedItemPrice = 0;

function getStyle(item: Item): string {
  return `
top: ${item.posY}px;
left: ${item.posX}px;
`;
}

function selectButton(item: Item) {
  selectedItem.value = item;
}

function openInNewTab(url: string) {
  window.open(url, '_blank', 'noreferrer');
}

const amazonIds = computed<string[]>(() => {
  return items.value.map((item) => item.amazonId);
});

function getAmazonPrice(id: string) {}
</script>

<style scoped>
.item-button {
  position: absolute;
}
.amazon-image {
  max-height: 300px;
  max-width: 200px;
}
.type::first-letter {
  text-transform: capitalize;
}
</style>
