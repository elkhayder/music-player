<script setup lang="ts">
import { useTracksStore } from "@/stores/tracks";
import { usePlayerStore } from "@/stores/player";
import type { Drill } from "utils/types";

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const drills = computed(() => trackStore.filteredTracks);
</script>

<template>
   <section class="w-full p-8 overflow-x-auto">
      <table class="w-full text-sm text-left text-white">
         <thead class="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
               <th scope="col" class="text-center">Play count</th>
               <th scope="col" class="text-center">Play / Pause</th>
               <th scope="col">Drill type</th>
               <th scope="col">Drill</th>
               <th scope="col">Track</th>
               <th scope="col" class="text-center">Show / Hide</th>
               <th scope="col" class="text-center">Popularity</th>
            </tr>
         </thead>
         <tbody>
            <TrackListEntry v-for="drill of drills" :drill="drill" />
         </tbody>
      </table>
   </section>
</template>

<style lang="scss" scoped>
th {
   @apply px-6 py-3 capitalize;
}
</style>
