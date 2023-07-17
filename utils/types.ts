export type DrillType = "FlashTrack" | "LoopTrack";

export type Drill = {
   id: string;
   titles: {
      english: string;
      spanish: string;
   };
   src: string;
   type: DrillType;
};

export type Playlist = {
   title: string;
   drills: Drill[];
};
