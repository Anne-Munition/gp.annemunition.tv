<template>
  <v-app>
    <v-main>
      <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
        <v-tab value="overview" prepend-icon="mdi-view-dashboard">Overview</v-tab>
        <v-tab value="hardware" prepend-icon="mdi-sitemap">Hardware Chart</v-tab>
        <v-tab value="audio" prepend-icon="mdi-audio-input-stereo-minijack">Audio Chart</v-tab>
        <v-tab value="gamingPc" prepend-icon="mdi-controller">Gaming PC</v-tab>
        <v-tab value="streamingPc" prepend-icon="mdi-multicast">Streaming PC</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="overview">
          <OverviewTab />
        </v-window-item>

        <v-window-item value="hardware">
          <HardwareTab />
        </v-window-item>

        <v-window-item value="audio">
          <AudioTab />
        </v-window-item>

        <v-window-item value="gamingPc">
          <GamingPcTab />
        </v-window-item>

        <v-window-item value="streamingPc">
          <StreamingPcTab />
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AudioTab from '@/components/AudioTab.vue';
import GamingPcTab from '@/components/GamingPcTab.vue';
import HardwareTab from '@/components/HardwareTab.vue';
import OverviewTab from '@/components/OverviewTab.vue';
import StreamingPcTab from '@/components/StreamingPcTab.vue';
import { getPrices } from '@/plugins/asin_price_lookup';

const tab = ref('overview');

onMounted(() => {
  if (process.env.NODE_ENV === 'production') getPrices();
});
</script>

<style scoped></style>
