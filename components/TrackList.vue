<script setup lang="ts">
import { useTracksStore } from "@/stores/tracks";
import { usePlayerStore } from "@/stores/player";

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const tracks = computed(() => trackStore.album!.tracks);
</script>

<template>
   <section class="w-full p-8 overflow-x-auto overflow-y-auto">
      <table class="w-full text-sm text-left text-white">
         <thead class="text-xs uppercase bg-gray-700 text-gray-400 select-none">
            <tr>
               <th scope="col" class="text-center">#</th>
               <th scope="col" class="text-center">
                  <span class="sr-only">Play/Pause</span>
               </th>
               <th scope="col" class="text-left">Track</th>
               <th scope="col">Artists</th>
               <th scope="col" class="text-right">Duration</th>
            </tr>
         </thead>
         <tbody>
            <TrackListEntry
               v-for="(track, index) of tracks"
               :key="index"
               :index="index"
               :track="track"
            />
         </tbody>
      </table>
   </section>
</template>

<style lang="scss" scoped>
th {
   @apply px-6 py-3 capitalize;
}
</style>
