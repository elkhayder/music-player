<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import WaveformData from "waveform-data";

const { HeightMax, HeightMin, BarsCount } = defineProps<{
   HeightMin: number;
   HeightMax: number;
   BarsCount: number;
   muted?: boolean;
}>();

const playerStore = usePlayerStore();
const tracksStore = useTracksStore();

const container = ref<HTMLDivElement | null>(null);

const progress = computed(() => {
   return playerStore.currentTime / playerStore.totalDuration;
});

const updateBars = () => {
   if (!tracksStore.currentTrack.waveform)
      Heights.value = Array(BarsCount)
         .fill(0)
         .map(() =>
            Math.floor(Math.random() * (HeightMax - HeightMin) + HeightMin)
         );
   else
      fetch(tracksStore.currentTrack.waveform)
         .then((response) => response.arrayBuffer())
         .then((buffer) => WaveformData.create(buffer))
         .then((waveform) => waveform.resample({ width: BarsCount }))
         .then((waveform) => {
            const channel = waveform.channel(0);

            let data = [];
            let max = 0;

            for (let i = 0; i < waveform.length; i++) {
               // height
               let value = Math.abs(
                  channel.max_sample(i) - channel.min_sample(i)
               );

               data[i] = value;

               if (value > max) max = value;
            }

            for (let i = 0; i < waveform.length; i++) {
               data[i] /= max; // standarize
               data[i] *= HeightMax; // scale
            }

            Heights.value = data;
         });
};

onMounted(() => {
   container.value?.addEventListener("click", (e) => {
      const sliderWidth = window.getComputedStyle(container.value!).width;
      const percentageToSeek = e.offsetX / parseFloat(sliderWidth);
      const newTime = percentageToSeek * playerStore.totalDuration;
      playerStore.setTime(newTime);
   });

   updateBars();
});

watch(() => tracksStore.currentTrack, updateBars);

const Heights = ref<Array<number>>([]);
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
</template>

<style lang="scss" scoped></style>
