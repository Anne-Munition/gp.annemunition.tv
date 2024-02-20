<template>
  <v-card class="card elevation-2">
    <v-card-title> Cable Legend </v-card-title>
    <v-card-text>
      <div v-for="cable in cables" :key="cable.name" class="container">
        <LegendItem :cable="cable" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import LegendItem from '@/components/LegendItem.vue';
import cables from '@/equipment/cables';
</script>

<style scoped>
.card {
  max-width: 200px;
  background: #3a3a3a;
}
</style>
