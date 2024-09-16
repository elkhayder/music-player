<template>
   <div>
      <h1 class="text-5xl lg:text-6xl font-semibold mb-2">Albums</h1>

      <section
         class="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
         <NuxtLink v-for="album of data" :to="`/album/${album.slug}`">
            <div
               class="p-4 pb-5 group rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-100 cursor-pointer"
            >
               <NuxtImg :src="album.cover" class="rounded-sm" />
               <div class="flex justify-between items-center mt-4">
                  <div>
                     <h3 class="text-2xl font-semibold">{{ album.title }}</h3>
                     <h5 class="mt-1 text-sm">{{ album.artist }}</h5>
                  </div>
                  <button
                     class="rounded-full bg-orange-500 group-hover:bg-orange-600 transition-all duration-150 aspect-square h-10"
                  >
                     <i class="fas fa-chevron-right" title="Play" />
                  </button>
               </div>
            </div>
         </NuxtLink>
      </section>
   </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch<Omit<Album, "tracks">[]>("/api/album/");
</script>

<style></style>
