<template>
  <div class="item">
    <div class="name">
      {{ cable.name }}
    </div>
    <div class="line" :style="style"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  cable: Cable;
}>();

const style = computed(() => {
  const c1 = props.cable.color1;
  const c2 = props.cable.color2;
  return `
  background-image: repeating-linear-gradient(
    45deg,
    ${c1},
    ${c1} 10px,
    ${c2} 10px,
    ${c2} 20px
  );
  `;
});
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
}
.name {
  white-space: nowrap;
}
.line {
  height: 6px;
  width: 100%;
  border-radius: 5px;
  margin-left: 8px;
  background-size: 200% 200%;
}
.line:hover {
  animation: barberpole 1s infinite linear;
}
@keyframes barberpole {
  100% {
    background-position: -30px;
  }
}
</style>
