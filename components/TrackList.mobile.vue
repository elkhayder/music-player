<script setup lang="ts">
import { useTracksStore } from "@/stores/tracks";
import { usePlayerStore } from "@/stores/player";

const trackStore = useTracksStore();
const playerStore = usePlayerStore();

const device = useDevice();

const tracks = computed(() => trackStore.album!.tracks);
</script>

<template>
   <section class="w-full p-4 overflow-y-auto">
      <TrackListEntry
         v-for="(track, index) of tracks"
         :key="index"
         :index="index"
         :track="track"
      />
   </section>
</template>

<style lang="scss" scoped>
th {
   @apply px-6 py-3 capitalize;
}
</style>
