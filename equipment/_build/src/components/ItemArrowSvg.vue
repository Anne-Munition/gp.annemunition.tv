<template>
  <svg xmlns="http://www.w3.org/2000/svg">
    <polygon :points="points"></polygon>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  line: Line;
}>();

const points = computed(() => {
  if (!props.line) return '';
  return props.line.points
    .map((point) => {
      return point.x + ',' + point.y;
    })
    .join(' ');
});
</script>

<style scoped>
svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
}
polygon {
  fill: rgba(77, 77, 77, 0.67);
}
</style>
