<template>
  <PcEquipment :image="image" :equipment="streamingPc" />
</template>

<script setup lang="ts">
import PcEquipment from '@/components/PcEquipment.vue';
import streamingPc from '@/equipment/streaming_pc';
import image from '@/assets/images/streaming_pc.png';
</script>

<style scoped></style>
