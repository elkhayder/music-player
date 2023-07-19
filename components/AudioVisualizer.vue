<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
import colors from "tailwindcss/colors";

const playerStore = usePlayerStore();

const canvas = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D>();

onMounted(() => {
   context.value = canvas.value!.getContext("2d")!;
   console.log(context.value);

   renderFrame();

   canvas.value?.addEventListener("click", (e) => {
      const sliderWidth = window.getComputedStyle(canvas.value!).width;
      const percentageToSeek = e.offsetX / parseFloat(sliderWidth);
      const newTime = percentageToSeek * playerStore.totalDuration;
      playerStore.setTime(newTime);
   });
});

const renderFrame = () => {
   requestAnimationFrame(renderFrame);

   const WIDTH = canvas.value!.width;
   const HEIGHT = canvas.value!.height;
   var barWidth = WIDTH / playerStore.bufferLength;

   var x = 0;

   playerStore.analyser!.getByteFrequencyData(playerStore.dataArray!);

   const max = Math.max(...playerStore.dataArray!);

   //    context.value!.fillStyle = "";
   //    context.value!.fillRect(0, 0, WIDTH, HEIGHT);
   context.value!.clearRect(0, 0, WIDTH, HEIGHT);

   for (var i = 0; i < playerStore.bufferLength; i++) {
      var barHeight = ((playerStore.dataArray![i] / max) * HEIGHT) / 1.2;

      //   var r = barHeight + 25 * (i / playerStore.bufferLength);
      //   var g = 250 * (i / playerStore.bufferLength);
      //   var b = 50;

      //   context.value!.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      context.value!.fillStyle = colors.orange[500];
      context.value!.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
   }
};
</script>

<template>
   <canvas ref="canvas" class="h-16 w-full cursor-pointer" />
</template>

<style lang="scss" scoped></style>
