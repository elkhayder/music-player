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

   type DrillWithNumber = Drill & { number: number };

   // return results;
   return results
      .map((result: any): DrillWithNumber[] => {
         const object = result.properties;

         const titles = {
            english: object["English Equivalent"].rich_text[0].plain_text,
            spanish: object["Spanish Phrase"].title[0].plain_text,
         };

         const popularity =
            ["Low", "Medium", "High"].indexOf(
               object["Popularity"].select?.name
            ) + 1;

         const number = object["Phrase/Word #"].number;

         const idBase = result.id;

         const tracks: DrillWithNumber[] = [];

         if (object["FT File"].files.length > 0) {
            tracks.push({
               number,
               popularity,
               titles,
               id: idBase + "-FT",
               src: object["FT File"].files[0].file.url,
               type: "FlashTrack",
            });
         }

         if (object["LT File"].files.length > 0) {
            tracks.push({
               number,
               popularity,
               titles,
               id: idBase + "-LT",
               src: object["LT File"].files[0].file.url,
               type: "LoopTrack",
            });
         }

         return tracks;
      })
      .flat()
      .sort((a, b) => a.number - b.number);
});
