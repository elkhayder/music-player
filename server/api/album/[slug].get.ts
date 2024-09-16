import Albums from "@/server/utils/db";

export default defineEventHandler(async (event) => {
   const slug = event.context.params?.slug;

   if (!slug) {
      throw createError({
         status: 400,
         statusMessage: "Missing Album slug",
      });
   }

   const index = Albums.findIndex((x) => x.slug === slug);

   if (index === -1) {
      throw createError({ status: 404, statusMessage: "Album not found" });
   }

   return Albums[index];
});
