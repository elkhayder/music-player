<script setup lang="ts">
import { Drill } from "@/utils/types";
import { usePlayerStore } from "@/stores/player";
import { useTracksStore } from "@/stores/tracks";

const { drill } = defineProps<{ drill: Drill }>();

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const onCLick = computed(() => {
   if (drill.isHidden) return;

   return drill.id == trackStore.currentTrackID
      ? playerStore.togglePlay
      : () => trackStore.setCurrentTrackID(drill.id);
});
</script>

<template>
   <tr
      class="border-b border-gray-700 hover:bg-gray-500 cursor-pointer"
      :class="{
         'bg-zinc-800': drill.type == 'LoopTrack',
         '!bg-gray-600': drill.id === trackStore.currentTrackID,
         '!text-gray-400 cursor-not-allowed': drill.isHidden,
      }"
      :key="drill.id"
      @click="onCLick"
   >
      <th scope="row" class="text-center">
         <!-- font-medium whitespace-nowrap  -->
         {{ drill.plays ?? "-" }}
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
         <AudioWave :HeightMax="20" :HeightMin="4" :BarsCount="30" />
         <!-- <time>00:19</time> -->
      </td>
      <td
         class="text-center !cursor-pointer"
         @click="
            (e) => {
               e.preventDefault();
               e.stopPropagation();
               drill.isHidden = !drill.isHidden;
               //    trackStore.toggleIsHidden(drill.id);
            }
         "
      >
         <i class="fas fa-eye" />
      </td>
      <td class="text-center">
         <i
            :class="`fas fa-signal${
               drill.popularity < 3 ? '-' + (drill.popularity + 2) : ''
            }`"
         />
      </td>
   </tr>
</template>

<style lang="scss" scoped>
td {
   @apply px-6 py-4;
}
</style>
