<template>
  <v-app>
    <v-main>
      <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
        <v-tab value="hardware" prepend-icon="mdi-sitemap">Hardware Chart</v-tab>
        <v-tab value="audio" prepend-icon="mdi-audio-input-stereo-minijack">Audio Chart</v-tab>
        <v-tab value="gamingpc" prepend-icon="mdi-controller">Gaming PC</v-tab>
        <v-tab value="streamingpc" prepend-icon="mdi-application-braces">Streaming PC</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="hardware">
          <HardwareTab />
        </v-window-item>

        <v-window-item value="audio">
          <AudioTab />
        </v-window-item>

        <v-window-item value="gamingpc">
          <GamingPcTab />
        </v-window-item>

        <v-window-item value="streamingpc">
          <StreamingPcTab />
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AudioTab from '@/components/AudioTab.vue';
import GamingPcTab from '@/components/GamingPcTab.vue';
import HardwareTab from '@/components/HardwareTab.vue';
import StreamingPcTab from '@/components/StreamingPcTab.vue';
import { getPrices } from '@/plugins/amazon_prices';

const tab = ref('streamingpc');
getPrices();
</script>

<style scoped></style>
