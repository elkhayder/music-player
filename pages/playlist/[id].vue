<script setup lang="ts">
definePageMeta({
   validate: async (route) => {
      // Check if the id is made up of digits
      return Playlists.filter((x) => x.id == route.params.id).length > 0;
   },
});

const route = useRoute();

const Playlist = Playlists.filter((x) => x.id == route.params.id)[0];
</script>

<template>
   <section class="grid grid-cols-2 p-8">
      <PlaylistInfo :playlist="Playlist" />
      <PlayingTrack />
   </section>
   <TrackList :drills="Playlist.drills" />
</template>

<style lang="scss" scoped></style>
