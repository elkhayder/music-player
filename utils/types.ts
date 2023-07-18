export type Album = {
   slug: string;
   title: string;
   cover: string;
   tracks: Track[];
   artist: string;
};

export type Track = {
   title: string;
   artists: string[];
   duration: number;
   src: string;
};
