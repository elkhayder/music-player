import { notion } from "../utils/notion";
import { Drill } from "@/utils/types";

export default defineEventHandler(async (event) => {
   const query = getQuery(event);

   if (typeof query.playlist != "string") {
      throw createError({
         statusCode: 400,
         statusMessage: "playlist must be a string",
      });
   }

   const { results } = await notion.databases.query({
      database_id: process.env.DB_ID!,
      filter: {
         property: "Playlist",
         multi_select: {
            contains: query.playlist,
         },
      },
   });

   // return results;
   return results
      .map((result: any): Drill[] => {
         const object = result.properties;

         const titles = {
            english: object["English Equivalent"].rich_text[0].plain_text,
            spanish: object["Spanish Phrase"].title[0].plain_text,
         };

         const idBase = `${titles.english} - ${titles.spanish}`;

         const tracks: Drill[] = [];

         if (object["FT File"].files.length > 0) {
            tracks.push({
               titles,
               id: idBase + "FT",
               src: object["FT File"].files[0].file.url,
               type: "FlashTrack",
            });
         }

         if (object["LT File"].files.length > 0) {
            tracks.push({
               titles,
               id: idBase + "LT",
               src: object["LT File"].files[0].file.url,
               type: "LoopTrack",
            });
         }

         return tracks;
      })
      .flat();
});
