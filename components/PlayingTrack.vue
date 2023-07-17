<script setup lang="ts">
import { usePlayerStore } from "../stores/player";
import { useTracksStore } from "../stores/tracks";

const trackStore = useTracksStore();
const track = computed(() => trackStore.currentTrack);

const playerStore = usePlayerStore();
</script>

<template>
   <div
      v-if="track"
      class="flex-1 w-full max-w-md flex flex-col justify-center"
   >
      <div class="flex items-center justify-between">
         <div>
            <h4 class="text-xl md:text-2xl font-bold">
               {{ track.titles.spanish }}
            </h4>
            <h6 class="text-xs md:text-base mt-1 font-medium">
               {{ track.titles.english }}
            </h6>
         </div>
         <h2 class="text-xs md:text-base">{{ track.type }}</h2>
      </div>
      <div class="mt-6 flex items-center gap-4 font-mono">
         <time>{{ FormatDuration(playerStore.currentTime) }}</time>
         <!-- <img class="w-full max-w-full invert" src="./images/waveform.png" /> -->
         <AudioWave
            :HeightMax="70"
            :HeightMin="10"
            :BarsCount="40"
            :isMain="true"
         />
         <time> {{ FormatDuration(playerStore.totalDuration) }} </time>
      </div>
      <div class="mt-6 flex items-center gap-4">
         <i
            class="fas fa-volume-mute cursor-pointer"
            @click="() => playerStore.setVolume(0)"
         />
         <input
            class="w-full"
            type="range"
            min="0"
            max="100"
            :value="playerStore.volume * 100"
            @input="(e) => playerStore.setVolume((e.target as any).value / 100)"
         />
         <i
            class="fas fa-volume cursor-pointer"
            @click="() => playerStore.setVolume(1)"
         />
      </div>
      <div class="mt-8 flex items-center justify-around [&>*]:cursor-pointer">
         <i
            class="far fa-random"
            :class="{
               'text-orange-400': trackStore.isShuffled,
            }"
            @click="trackStore.toggleShuffle"
         />
         <i class="fas fa-backward" @click="trackStore.previousTrack" />
         <div
            class="bg-white w-10 h-10 rounded-full flex items-center justify-center text-black"
            @click="playerStore.togglePlay"
         >
            <!-- pl-0.5 -->
            <i
               class="fas"
               :class="{
                  'fa-pause': playerStore.isLoaded && playerStore.isPlaying,
                  'fa-play': playerStore.isLoaded && !playerStore.isPlaying,
                  'fad fa-spinner fa-spin': !playerStore.isLoaded,
               }"
            />
         </div>
         <i class="fas fa-forward" @click="trackStore.nextTrack" />
         <i
            class="far fa-repeat"
            :class="{
               'text-orange-400': trackStore.isOnRepeat,
            }"
            @click="trackStore.toggleRepeat"
         />
         <i
            class="far fa-redo fa-flip-horizontal"
            @click="() => playerStore.setRelativeTime(-2)"
         />
      </div>
   </div>
</template>

<style lang="scss" scoped></style>
