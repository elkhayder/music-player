<script setup lang="ts">
import { useTracksStore } from "../stores/tracks";

const trackStore = useTracksStore();
const playlist = computed(() => trackStore.playlist);
</script>

<template>
   <div class="flex items-center gap-4 md:gap-8 max-md:w-full">
      <img
         src="/logo.png"
         alt="Spanish Audio Drills Logo"
         class="h-32 md:h-48"
      />
      <!-- w-32 md:w-48 -->
      <div>
         <h2 class="text-xl md:text-4xl font-semibold mb-2">
            {{ playlist.title }}
         </h2>
         <h4 class="text-xs md:text-base mb-4 md:mb-8">
            {{ playlist.drills.length }} Audio Drills
         </h4>
         <div>
            <label
               for="filter"
               class="block mb-2 text-sm font-medium text-white"
            >
               Filter drills
            </label>
            <select
               id="filter"
               class="border text-sm rounded-lg block w-full p-1 px-4 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
               @change="(e) => trackStore.setFilter((e.target as any).value)"
            >
               <option value="All" selected>All</option>
               <option value="FlashTrack">FlashTracks</option>
               <option value="LoopTrack">LoopTracks</option>
            </select>
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped></style>
