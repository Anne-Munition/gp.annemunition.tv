<template>
  <PcEquipment :image="image" :equipment="gamingPc" />
</template>

<script setup lang="ts">
import PcEquipment from '@/components/PcEquipment.vue';
import gamingPc from '@/equipment/gaming_pc';

const image =
  'https://nzxt.com/assets/cms/34299/1621190817-03h510-siege-side-nosystem.png?auto=format&fit=crop&h=1000&w=1000';
</script>

<style scoped></style>
