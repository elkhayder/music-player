<script setup lang="ts">
import { FormatDurationString } from "@/utils/duration";
import { useTracksStore } from "../stores/tracks";

const trackStore = useTracksStore();
const album = computed(() => trackStore.album);
</script>

<template>
   <div class="flex items-end gap-4 md:gap-8 max-md:w-full">
      <img
         :src="`/cover/${album!.cover}`"
         alt="Spanish Audio Drills Logo"
         class="h-32 md:h-48 lg:h-56"
      />
      <!-- w-32 md:w-48 -->
      <div>
         <h3 class="text-xs md:text-base font-semibold">
            {{ album!.artist }}
         </h3>
         <h2 class="text-5xl lg:text-8xl font-semibold mb-2">
            {{ album!.title }}
         </h2>
         <h4 class="text-xs md:text-base text-gray-400">
            {{ album!.tracks.length }} Tracks •
            {{
               FormatDurationString(
                  album!.tracks.reduce((prev, item) => prev + item.duration, 0)
               )
            }}
         </h4>
      </div>
   </div>
</template>

<style lang="scss" scoped></style>
