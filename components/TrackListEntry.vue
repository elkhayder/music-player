<script setup lang="ts">
import { Track } from "@/utils/types";
import { usePlayerStore } from "@/stores/player";
import { useTracksStore } from "@/stores/tracks";
import { FormatDuration } from "@/utils/duration";

const { track, index } = defineProps<{ track: Track; index: number }>();

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const onCLick = computed(() => {
   return index == trackStore.currentTrackIndex
      ? playerStore.togglePlay
      : () => trackStore.setCurrentTrackIndex(index);
});
</script>

<template>
   <tr
      class="border-b border-gray-700 hover:bg-gray-500 cursor-pointer"
      :class="{
         '!bg-gray-600': index == trackStore.currentTrackIndex,
      }"
      @click="onCLick"
   >
      <th scope="row" class="text-center text-gray-400">
         <!-- font-medium whitespace-nowrap  -->
         {{ index + 1 }}
      </th>
      <td class="text-center text-xs">
         <i
            class="fas"
            :class="{
               'fa-play':
                  !playerStore.isPlaying ||
                  index !== trackStore.currentTrackIndex,
               'fa-pause':
                  index === trackStore.currentTrackIndex &&
                  playerStore.isPlaying,
            }"
         />
      </td>
      <td>
         <h5 class="font-semibold">{{ track.title }}</h5>
      </td>
      <td>
         {{ track.artists.join(" • ") }}
         <!-- <time>00:19</time> -->
      </td>

      <td class="text-right font-mono">
         {{ FormatDuration(track.duration) }}
      </td>
   </tr>
</template>

<style lang="scss" scoped>
td {
   @apply px-6 py-4;
}
</style>
