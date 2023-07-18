export const FormatDuration = (seconds: number) => {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);
   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
};

export const FormatDurationString = (seconds: number) => {
   const hours = Math.floor(seconds / 3600);
   const minutes = Math.floor((seconds % 3600) / 60);
   const remainingSeconds = seconds % 60;

   var result = "";
   if (hours > 0) {
      result += `${hours}h `;
   }
   result += `${minutes.toString().padStart(2, "0")}m `;
   result += `${remainingSeconds.toString().padStart(2, "0")}s`;

   return result;
};
