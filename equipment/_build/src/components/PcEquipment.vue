<template>
  <v-container class="container">
    <v-row>
      <v-col cols="3">
        <div
          class="item-list pa-1"
          v-for="(item, index) in items"
          :key="item.name"
          @click="selectedIndex = index"
          :class="{ selected: index == selectedIndex }"
        >
          <v-icon :icon="`mdi-${item.icon}`"></v-icon>
          {{ item.name }}
        </div>
      </v-col>
      <v-col cols="6">
        <div id="pc-graphic">
          <img :src="image" alt="" />
          <v-btn
            density="compact"
            icon="mdi-circle-medium"
            v-for="(item, index) in items"
            :key="item.name"
            @click="selectedIndex = index"
            class="item-button"
            :class="{ selected: index == selectedIndex }"
            :style="`top: ${item.top}%; left: ${item.left}%;`"
            size="small"
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
import { computed, ref } from 'vue';
import ItemCard from '@/components/ItemCard.vue';

const props = defineProps<{
  image: string;
  equipment: PC;
}>();

const items = computed<Item[]>(() => {
  // Turn the PC object into an iterable array
  const array: Item[] = [];
  for (const key in props.equipment) {
    const item = props.equipment[key as keyof PC];
    if (Array.isArray(item)) array.push(...item);
    else array.push(item);
  }
  return array;
});

const selectedIndex = ref<number>(-1);
const selectedItem = computed(() => {
  return items.value[selectedIndex.value];
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
  background: #edae15;
  color: black;
}
.selected {
  background: #911e95 !important;
  color: white;
}
.item-button.selected {
  animation: expand 1.5s infinite;
}
@keyframes expand {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.25);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
