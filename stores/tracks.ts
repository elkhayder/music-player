import { defineStore } from "pinia";
import { Playlists } from "../utils/db";
import { Drill, DrillType, Playlist } from "../utils/types";
import { usePlayerStore } from "./player";

export const useTracksStore = defineStore("tracks", () => {
   const playerStore = usePlayerStore();

   const playlist = reactive<Playlist>({
      title: "Placeholder",
      drills: [],
   });

   const setPlaylistTitle = (title: string) => {
      playlist.title = title;
   };

   const setDrills = (tracks: Drill[]) => {
      playlist.drills = tracks;
   };

   const filter = ref<DrillType | "All">("All");
   const setFilter = (type: DrillType | "All") => {
      filter.value = type;
   };

   const filteredTracks = computed(() =>
      playlist.drills.filter(
         (x) => filter.value == "All" || x.type == filter.value
      )
   );

   const currentTrackID = ref<string | null>(null);
   const setCurrentTrackID = (id: string) => {
      currentTrackID.value = id;
      playerStore.setAudioSrc(currentTrack.value!.src);
   };

   const currentTrack = computed(
      () => playlist.drills.find((x) => x.id === currentTrackID.value) ?? null
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
      const currentTrackIndex = filteredTracks.value.findIndex(
         (x) => x.id === currentTrackID.value
      );

      var newIndex;

      if (!isShuffled.value && currentTrackIndex == 0 && indexOffset == -1) {
         newIndex = filteredTracks.value.length - 1;
      } else if (
         !isShuffled.value &&
         currentTrackIndex == filteredTracks.value.length - 1 &&
         indexOffset == 1
      ) {
         newIndex = 0;
      } else {
         newIndex = isShuffled.value
            ? Math.floor(Math.random() * filteredTracks.value.length)
            : currentTrackIndex + indexOffset;
      }

      const newTrackId = filteredTracks.value[newIndex]!.id;
      setCurrentTrackID(newTrackId);
   };

   return {
      playlist,
      setPlaylistTitle,
      setDrills,
      currentTrack,
      currentTrackID,
      setCurrentTrackID,
      filter,
      setFilter,
      filteredTracks,
      isShuffled,
      toggleShuffle,
      isOnRepeat,
      toggleRepeat,
      nextTrack,
      previousTrack,
   };
});
