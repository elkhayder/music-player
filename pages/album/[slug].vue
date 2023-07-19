<script setup lang="ts">
import { Album } from "@/utils/types";
import { useTracksStore } from "@/stores/tracks";

const route = useRoute();
const trackStore = useTracksStore();

const { data } = await useFetch<Album>("/api/fetch", {
   query: {
      album: route.params.slug,
   },
});

if (data.value) {
   trackStore.setAlbum(data.value);
} else {
   throw createError({
      statusCode: 404,
      message: "Album not found: " + route.params.slug,
   });
}
</script>

<template>
   <Title>{{ trackStore.album!.title }} — Music Player — zelkhayder.me</Title>
   <main class="max-w-6xl mx-auto relative">
      <section
         class="flex max-md:flex-col items-center justify-between p-8 gap-8"
      >
         <AlbumInfo />
         <PlayingTrack />
      </section>
      <TrackList />
   </main>
   <footer
      class="text-sm text-center font-mono font-normal p-4 mb-2 text-gray-400"
   >
      Created with ❤️ by
      <a href="https://zelkhayder.me" target="_blank" class="underline">
         @elkhayder
      </a>
   </footer>
   <audio class="hidden" crossorigin="anonymous" id="audio-player" />
</template>

<style lang="scss" scoped></style>
