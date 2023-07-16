<script setup lang="ts">
const { progress, HeightMax, HeightMin, BarsCount } = withDefaults(
   defineProps<{
      progress: number;
      HeightMin: number;
      HeightMax: number;
      BarsCount?: number;
   }>(),
   {
      BarsCount: 40,
   }
);

const Heights = Array(BarsCount)
   .fill(0)
   .map(() => Math.floor(Math.random() * (HeightMax - HeightMin) + HeightMin));
</script>

<template>
   <div class="w-full flex items-center justify-around">
      <span
         v-for="(height, index) of Heights"
         class="w-1 bg-white rounded-md"
         :class="{
            'bg-blue-400': index / BarsCount < progress,
         }"
         :style="{
            height: height + 'px',
         }"
      />
   </div>
</template>

<style lang="scss" scoped></style>
