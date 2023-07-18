import * as fs from "fs";
import * as path from "path";
import Albums from "../utils/db";

export default defineEventHandler(async (event) => {
   const query = getQuery(event);

   if (!query.album) {
      throw createError({
         status: 400,
         statusMessage: "Missing Album query parameter",
      });
   }

   const index = Albums.findIndex((x) => x.slug === query.album);

   if (index === -1) {
      throw createError({ status: 404, statusMessage: "Album not found" });
   }

   return Albums[index];
});
