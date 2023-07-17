<script setup lang="ts">
import { useTracksStore } from "@/stores/tracks";
import { usePlayerStore } from "@/stores/player";
import type { Drill } from "utils/types";

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const drills = computed(() => trackStore.filteredTracks);
</script>

<template>
   <section class="p-8">
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
            <tr
               v-for="drill of drills"
               class="border-b border-gray-700 hover:bg-gray-500 cursor-pointer"
               :class="{
                  'bg-gray-600': drill.id === trackStore.currentTrackID,
               }"
               :key="drill.id"
               @click="() => trackStore.setCurrentTrackID(drill.id)"
            >
               <th scope="row" class="text-center">
                  <!-- font-medium whitespace-nowrap  -->
                  20
               </th>
               <td class="text-center">
                  <i
                     class="fas"
                     :class="{
                        'fa-play':
                           !playerStore.isPlaying ||
                           drill.id !== trackStore.currentTrackID,
                        'fa-pause':
                           drill.id === trackStore.currentTrackID &&
                           playerStore.isPlaying,
                     }"
                  />
               </td>
               <td>{{ drill.type }}</td>
               <td>
                  <h5 class="text-base">{{ drill.titles.spanish }}</h5>
                  <h6 class="text-sm">{{ drill.titles.english }}</h6>
               </td>
               <td>
                  <AudioWave
                     :HeightMax="20"
                     :HeightMin="4"
                     :progress="0"
                     :BarsCount="30"
                  />
                  <!-- <time>00:19</time> -->
               </td>
               <td class="text-center"><i class="fas fa-eye" /></td>
               <td class="text-center"><i class="fas fa-signal-3" /></td>
            </tr>
         </tbody>
      </table>
      <!-- 
         <tbody>
            <tr class="py-4" v-for="track of Array(5).fill(0)">
               <td class="text-center">10</td>
               <td class="text-center">
                  <i class="fas fa-play" />
               </td>
               <td class="text-left">FlashCard</td>
               <td>
                  <h5 class="text-base">Spanish Title</h5>
                  <h6 class="text-sm">English Title</h6>
               </td>
               <td class="flex items-center gap-2">
                  <AudioWave
                     :HeightMax="20"
                     :HeightMin="4"
                     :progress="0"
                     :BarsCount="15"
                  />
                  <time>00:19</time>
               </td>
               <td><i class="fas fa-eye" /></td>
               <td><i class="fas fa-signal-3" /></td>
            </tr>
         </tbody>
      </table> -->
   </section>
</template>

<style lang="scss" scoped>
th {
   @apply px-6 py-3 capitalize;
}

td {
   @apply px-6 py-4;
}
</style>
