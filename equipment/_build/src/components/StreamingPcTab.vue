<template>
  <v-container class="container">
    <v-row>
      <v-col cols="3">
        <div
          class="item-list pa-1"
          v-for="(item, index) in items"
          :key="item.name"
          @click="selectItem(item)"
          :class="{ selected: selectedItem && item.name == selectedItem.name }"
        >
          <v-icon :icon="`mdi-${item.icon}`"></v-icon>
          {{ item.name }}
          <ItemArrowSvg class="svg" :line="lines[index]" />
        </div>
      </v-col>
      <v-col cols="6">
        <div id="pc-graphic">
          <img src="@/assets/images/streaming_pc.png" alt="" />
          <v-btn
            density="compact"
            icon="mdi-plus"
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
        <ItemCard :item="selectedItem" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import streamingPc from '@/equipment/streaming_pc';
import ItemArrowSvg from '@/components/ItemArrowSvg.vue';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import ItemCard from '@/components/ItemCard.vue';

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

const lines = ref<Line[]>([]);
function getLines() {
  const listElements = document.querySelectorAll('.item-list');
  const buttonElements = document.querySelectorAll('.item-button');
  const heightOffset = 48;
  lines.value = [];
  for (let i = 0; i < items.value.length; i++) {
    const itemRect = listElements[i].getBoundingClientRect();
    const buttonRect = buttonElements[i].getBoundingClientRect();
    const points: Point[] = [];
    points.push({ x: itemRect.right, y: itemRect.top - heightOffset });
    points.push({ x: itemRect.right, y: itemRect.bottom - heightOffset });
    points.push({
      x: buttonRect.left + buttonRect.width / 2,
      y: buttonRect.top + buttonRect.height / 2 - heightOffset,
    });
    lines.value.push({ points });
  }
}

onMounted(() => {
  window.addEventListener('load', getLines);
  window.addEventListener('resize', getLines);
});

onBeforeUnmount(() => {
  window.removeEventListener('load', getLines);
  window.removeEventListener('resize', getLines);
});
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
  background: #ffd800;
  color: black;
}
.selected {
  background: #911e95 !important;
  color: white;
}
.item-list .svg {
  visibility: hidden;
  pointer-events: none;
}
.item-list:hover .svg {
  visibility: visible;
}
</style>
