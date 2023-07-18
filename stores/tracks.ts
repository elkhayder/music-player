import { defineStore } from "pinia";
import { Album, Track } from "../utils/types";
import { usePlayerStore } from "./player";

export const useTracksStore = defineStore("tracks", () => {
   const playerStore = usePlayerStore();

   const album = ref<Album | null>(null);

   const setAlbum = (value: Album) => {
      album.value = value;
   };

   const currentTrackIndex = ref<number | null>(null);
   const setCurrentTrackIndex = (id: number) => {
      currentTrackIndex.value = id;
      playerStore.setAudioSrc(currentTrack.value!.src);
   };

   onMounted(() => {
      setCurrentTrackIndex(0);
   });

   const currentTrack = computed(
      () => album.value!.tracks[currentTrackIndex.value!]
   );

   const isShuffled = ref(false);
   const toggleShuffle = () => {
      isShuffled.value = !isShuffled.value;
   };

   const isOnRepeat = ref(false);
   const toggleRepeat = () => {
      isOnRepeat.value = !isOnRepeat.value;
   };

   const nextTrack = () => setRelativeTrack(1);

   const previousTrack = () => setRelativeTrack(-1);

   const setRelativeTrack = (indexOffset: number) => {
      var newIndex;
      if (isShuffled.value) {
         newIndex = Math.floor(Math.random() * album.value!.tracks.length);
      } else {
         newIndex =
            (currentTrackIndex.value! + indexOffset) %
            album.value!.tracks.length;

         if (newIndex < 0) {
            newIndex = album.value!.tracks.length - 1;
         }
      }

      setCurrentTrackIndex(newIndex);
   };

   return {
      album,
      setAlbum,
      currentTrack,
      currentTrackIndex,
      setCurrentTrackIndex,
      isShuffled,
      toggleShuffle,
      isOnRepeat,
      toggleRepeat,
      nextTrack,
      previousTrack,
   };
});
