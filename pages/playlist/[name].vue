<script setup lang="ts">
import { useTracksStore } from "@/stores/tracks";
import { Drill } from "utils/types";

// definePageMeta({
//    validate: async (route) => {
//       // Check if the id is made up of digits
//       return Playlists.filter((x) => x.id == route.params.id).length > 0;
//    },
// });

const route = useRoute();

const { data, error, status } = await useFetch<Drill[]>("/api/fetch", {
   query: {
      playlist: route.params.name,
   },
});

const trackStore = useTracksStore();
trackStore.setPlaylistTitle(route.params.name as string);
// parse
if (data.value) {
   trackStore.setDrills(data.value);
}
</script>

<template>
   <Title>{{ route.params.name }} — Spanish Audio Drills</Title>
   <main class="max-w-6xl mx-auto">
      <section
         class="flex max-md:flex-col items-center justify-between p-8 gap-8"
      >
         <PlaylistInfo />
         <PlayingTrack />
      </section>
      <TrackList />
   </main>
</template>

<style lang="scss" scoped></style>
