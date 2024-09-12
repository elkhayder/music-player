<script setup lang="ts">
import type { Track } from "@/utils/types";
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
   <div
      class="flex items-center gap-4 py-2 px-4 my-2 rounded-md hover:bg-gray-500 cursor-pointer"
      :class="{
         '!bg-gray-600': index == trackStore.currentTrackIndex,
      }"
      @click="onCLick"
   >
      <div class="text-center text-xs w-8">
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
      </div>
      <div class="mr-auto">
         <h5 class="font-semibold text-sm">{{ track.title }}</h5>
         <h6 class="text-xs mt-1 text-gray-200">
            {{ track.artists.join(" • ") }}
         </h6>
      </div>
      <div class="text-right text-sm font-mono w-12">
         {{ FormatDuration(track.duration) }}
      </div>
   </div>
</template>

<style lang="scss" scoped>
td {
   @apply px-6 py-4;
}
</style>
