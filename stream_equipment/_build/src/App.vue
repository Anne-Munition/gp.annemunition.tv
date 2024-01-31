<template>
  <v-app>
    <v-main>
      <v-tabs
        v-model="tab"
        bg-color="primary"
        fixed-tabs
      >
        <v-tab value="hardware">Hardware</v-tab>
        <v-tab value="audio">Audio</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="hardware">
          <HardwareTab />
        </v-window-item>

        <v-window-item value="audio">
          <AudioTab />
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref} from "vue";
import HardwareTab from "@/components/HardwareTab.vue";
import AudioTab from "@/components/AudioTab.vue";

const tab = ref('hardware')
</script>
