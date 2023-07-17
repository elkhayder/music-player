<script setup lang="ts">
definePageMeta({
   validate: async (route) => {
      // Check if the id is made up of digits
      return Playlists.filter((x) => x.id == route.params.id).length > 0;
   },
});
</script>

<template>
   <section class="flex max-md:flex-col items-center justify-between p-8 gap-8">
      <PlaylistInfo />
      <PlayingTrack />
   </section>
   <TrackList />
</template>

<style lang="scss" scoped></style>
