import { Playlist } from "./types";

export const Playlists: Playlist[] = [
   {
      id: "1",
      title: "Playlist 1",
      drills: [
         {
            id: "1",
            titles: {
               english: "Excuse me",
               spanish: "Con permiso",
            },
            src: "/audio/Phrases/FT - Con permiso - Excuse me.mp3",
            type: "FlashTrack",
         },
         {
            id: "2",
            titles: {
               english: "Excuse me",
               spanish: "Con permiso",
            },
            src: "/audio/Phrases/LT - Con permiso - Excuse me.mp3",
            type: "LoopTrack",
         },
         {
            id: "3",
            titles: {
               english: "You're welcome",
               spanish: "No hay de qué",
            },
            src: "/audio/Phrases/FT - No hay de qué - You_re welcome.mp3",
            type: "FlashTrack",
         },
         {
            id: "4",
            titles: {
               english: "You're welcome",
               spanish: "No hay de qué",
            },
            src: "/audio/Phrases/LT - No hay de qué - You_re welcome.mp3",
            type: "LoopTrack",
         },
         {
            id: "5",
            titles: {
               english: "Don't worry",
               spanish: "No te preocupes",
            },
            src: "/audio/Phrases/FT - No te preocupes - Don_t worry.mp3",
            type: "FlashTrack",
         },
         {
            id: "6",
            titles: {
               english: "Don't worry",
               spanish: "No te preocupes",
            },
            src: "/audio/Phrases/FT - No te preocupes - Don_t worry.mp3",
            type: "LoopTrack",
         },
      ],
   },
];
