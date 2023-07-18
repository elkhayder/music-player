<script setup lang="ts">
import { Album } from "@/utils/types";
import { useTracksStore } from "@/stores/tracks";

// definePageMeta({

// });

const route = useRoute();
const trackStore = useTracksStore();

// const { data, pending, error, refresh } = useAsyncData("playlist", () =>
//    $fetch("/api/fetch", {
//       query: {
//          playlist: route.params.name,
//       },
//    })
// );

// if (error.value) {
//    console.log("Error", error.value);
// } else if (data.value) {
//    console.log("Data", data);

//    trackStore.setAlbum(data as any);
// }

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
   <Title>{{ trackStore.album?.title }} — Music Player — zelkhayder.me</Title>
   <main class="max-w-6xl mx-auto">
      <audio class="hidden" crossorigin="anonymous" id="audio-player" />
      <section
         class="flex max-md:flex-col items-center justify-between p-8 gap-8"
      >
         <AlbumInfo />
         <PlayingTrack />
      </section>
      <TrackList />
   </main>
</template>

<style lang="scss" scoped></style>
