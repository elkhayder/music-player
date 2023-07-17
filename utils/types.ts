export type DrillType = "FlashTrack" | "LoopTrack";

export type Drill = {
   plays?: number;
   id: string;
   titles: {
      english: string;
      spanish: string;
   };
   src: string;
   type: DrillType;
   popularity: number;
   isHidden?: boolean;
};

export type Playlist = {
   title: string;
   drills: Drill[];
};
