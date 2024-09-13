<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";

const { HeightMax, HeightMin, BarsCount } = defineProps<{
   HeightMin: number;
   HeightMax: number;
   BarsCount: number;
   muted?: boolean;
}>();

const playerStore = usePlayerStore();

const container = ref<HTMLDivElement | null>(null);

const progress = computed(() => {
   return playerStore.currentTime / playerStore.totalDuration;
});

onMounted(() => {
   container.value?.addEventListener("click", (e) => {
      const sliderWidth = window.getComputedStyle(container.value!).width;
      const percentageToSeek = e.offsetX / parseFloat(sliderWidth);
      const newTime = percentageToSeek * playerStore.totalDuration;
      playerStore.setTime(newTime);
   });
});

const Heights = Array(BarsCount)
   .fill(0)
   .map(() => Math.floor(Math.random() * (HeightMax - HeightMin) + HeightMin));
</script>

<template>
   <div ref="container" class="w-full flex items-center justify-around">
      <span
         v-for="(height, index) of Heights"
         :key="index"
         class="w-1 bg-white rounded-md pointer-events-none"
         :class="{
            '!bg-gray-400': muted,
            '!bg-orange-400': index / BarsCount < progress,
         }"
         :style="{
            height: height + 'px',
         }"
      />
   </div>
   <!-- <img src="/waveform.png" class="max-w-full" /> -->
</template>

<style lang="scss" scoped></style>
