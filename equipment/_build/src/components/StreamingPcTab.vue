<template>
  <PcEquipment :image="image" :equipment="streamingPc" />
</template>

<script setup lang="ts">
import image from '@/assets/img/streaming_pc.png';
import PcEquipment from '@/components/PcEquipment.vue';
import streamingPc from '@/equipment/streaming_pc';
</script>

<style scoped></style>
