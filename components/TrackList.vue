<script setup lang="ts">
import { useTracksStore } from "@/stores/tracks";
import { usePlayerStore } from "@/stores/player";
import type { Drill } from "utils/types";

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const drills = computed(() => trackStore.sortedTracks);

const toggleSortByHidden = () => {
   if (trackStore.sortBy == "isHidden-ASC") {
      trackStore.setSortBy("isHidden-DESC");
   } else {
      trackStore.setSortBy("isHidden-ASC");
   }
};

const toggleSortByPopularity = () => {
   if (trackStore.sortBy == "Popularity-ASC") {
      trackStore.setSortBy("Popularity-DESC");
   } else {
      trackStore.setSortBy("Popularity-ASC");
   }
};
</script>

<template>
   <section class="w-full p-8 overflow-x-auto">
      <table class="w-full text-sm text-left text-white">
         <thead class="text-xs uppercase bg-gray-700 text-gray-400 select-none">
            <tr>
               <th scope="col" class="text-center">Play count</th>
               <th scope="col" class="text-center">Play / Pause</th>
               <th scope="col">Drill type</th>
               <th scope="col">Drill</th>
               <th scope="col">Track</th>
               <th
                  scope="col"
                  class="text-center cursor-pointer"
                  @click="toggleSortByHidden"
               >
                  Show / Hide
                  <i
                     class="ml-1 text-white fad"
                     :class="{
                        'fa-sort':
                           trackStore.sortBy != 'isHidden-ASC' &&
                           trackStore.sortBy != 'isHidden-DESC',
                        'fa-sort-up': trackStore.sortBy == 'isHidden-ASC',
                        'fa-sort-down': trackStore.sortBy == 'isHidden-DESC',
                     }"
                  />
               </th>
               <th
                  scope="col"
                  class="text-center cursor-pointer"
                  @click="toggleSortByPopularity"
               >
                  Popularity
                  <i
                     class="ml-1 text-white fad"
                     :class="{
                        'fa-sort':
                           trackStore.sortBy != 'Popularity-ASC' &&
                           trackStore.sortBy != 'Popularity-DESC',
                        'fa-sort-up': trackStore.sortBy == 'Popularity-ASC',
                        'fa-sort-down': trackStore.sortBy == 'Popularity-DESC',
                     }"
                  />
               </th>
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
