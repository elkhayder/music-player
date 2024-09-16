<script setup lang="ts">
import type { Album } from "@/utils/types";
import { useTracksStore } from "@/stores/tracks";

const route = useRoute();
const trackStore = useTracksStore();

const { data } = await useFetch<Album>("/api/album/" + route.params.slug);

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
   <section class="flex max-md:flex-col items-center justify-between gap-8">
      <AlbumInfo />
      <PlayingTrack />
   </section>
   <TrackList />
   <audio class="hidden" crossorigin="anonymous" id="audio-player" />
</template>

<style lang="scss" scoped></style>
