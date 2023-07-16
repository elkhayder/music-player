<script setup lang="ts">
const volume = ref(80);
</script>

<template>
   <div class="flex flex-col justify-center">
      <h4 class="text-2xl font-bold">Spanish Title</h4>
      <h6 class="mt-1 font-bold">English Title</h6>
      <div class="mt-6 flex items-center gap-4">
         <time>00:19</time>
         <!-- <img class="w-full max-w-full invert" src="./images/waveform.png" /> -->
         <AudioWave :HeightMax="70" :HeightMin="10" :progress="0.3" />
         <time> 01:23 </time>
      </div>
      <div class="mt-6 flex items-center gap-4">
         <i class="fas fa-volume-mute"></i>
         <input
            class="w-full"
            type="range"
            min="0"
            max="100"
            v-model="volume"
         />
         <i class="fas fa-volume"></i>
      </div>
      <div class="mt-8 flex items-center justify-around">
         <i class="fas fa-random"></i>
         <i class="fas fa-backward"></i>
         <i class="fas fa-play"></i>
         <i class="fas fa-forward"></i>
         <i class="fas fa-repeat-1"></i>
      </div>
   </div>
</template>

<style lang="scss" scoped></style>
