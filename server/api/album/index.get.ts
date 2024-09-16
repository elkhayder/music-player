import Albums from "@/server/utils/db";

export default defineEventHandler(async (event) => {
   return Albums.map((album) => ({
      slug: album.slug,
      cover: album.cover,
      artist: album.artist,
      title: album.title,
   }));
});
