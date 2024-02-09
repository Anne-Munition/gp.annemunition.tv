<template>
  <v-container class="container">
    <v-row>
      <v-col cols="3">
        <div
          class="item-list pa-1"
          v-for="item in items"
          :key="item.name"
          @click="selectItem(item)"
          :class="{ selected: selectedItem && item.name == selectedItem.name }"
        >
          <v-icon :icon="`mdi-${item.icon}`"></v-icon>
          {{ item.name }}
        </div>
      </v-col>
      <v-col cols="6">
        <div id="pc-graphic">
          <img src="@/assets/images/streaming_pc.png" alt="" />
          <v-btn
            density="compact"
            icon="mdi-plus"
            color="#ffd800"
            v-for="item in items"
            :key="item.name"
            @click="selectItem(item)"
            class="item-button"
            :class="{ selected: selectedItem && item.name == selectedItem.name }"
            :style="`top: ${item.posY}%; left: ${item.posX}%;`"
          />
        </div>
      </v-col>
      <v-col cols="3">
        <v-card v-if="selectedItem" :title="selectedItem.name">
          <v-card-text>
            <v-img :src="selectedItem.image"></v-img>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="#FFD800" variant="outlined" @click="openInNewTab(selectedItem.url)">
              View on Amazon
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import streamingPc from '@/equipment/streaming_pc';
import { computed, ref } from 'vue';

const items = computed<Item[]>(() => {
  // Turn the PC object into an iterable array
  const array: Item[] = [];
  for (const key in streamingPc) {
    const item = streamingPc[key as keyof PC];
    if (Array.isArray(item)) array.push(...item);
    else array.push(item);
  }
  return array;
});

const selectedItem = ref<Item>();
function selectItem(item: Item) {
  selectedItem.value = item;
}

function openInNewTab(url: string) {
  window.open(url, '_blank', 'noreferrer');
}
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 30px;
}
.item-list {
  cursor: pointer;
}
.item-list:hover {
  background: #4d4d4d;
}
#pc-graphic {
  position: relative;
}
#pc-graphic img {
  width: 100%;
}
.item-button {
  position: absolute;
  transform: translate(-50%, -50%);
  height: 10px;
  width: 10px;
}
.selected {
  background: #911e95;
}
</style>
