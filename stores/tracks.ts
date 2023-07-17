import { defineStore } from "pinia";
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

      if (!process.client) return;
      playlist.drills.forEach((drill) => {
         drill.plays = localStorage.getItem(drill.id)
            ? parseInt(localStorage.getItem(drill.id)!)
            : 0;
      });
   };

   const toggleIsHidden = (id: string) => {
      const drill = playlist.drills.find((x) => x.id === id);
      if (!drill) return;

      drill.isHidden = !drill.isHidden;
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

   const nonHiddenTracks = computed(() =>
      filteredTracks.value.filter((x) => !x.isHidden)
   );

   const currentTrackID = ref<string | null>(null);
   const setCurrentTrackID = (id: string) => {
      currentTrackID.value = id;
      playerStore.setAudioSrc(currentTrack.value!.src);

      // Increase plays count
      const newCount = ++playlist.drills.find((x) => x.id === id)!.plays!;
      localStorage.setItem(id, newCount.toString());
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
      if (isShuffled.value) {
         newIndex = Math.floor(Math.random() * filteredTracks.value.length);
      } else if (currentTrackIndex == -1) {
         newIndex = 0;
      } else {
         newIndex =
            (currentTrackIndex + indexOffset) % filteredTracks.value.length;
      }

      const nextTrack = filteredTracks.value.at(newIndex);

      if (nextTrack?.isHidden) {
         setRelativeTrack(Math.sign(indexOffset) * (Math.abs(indexOffset) + 1));
      } else {
         setCurrentTrackID(nextTrack!.id);
      }
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
      toggleIsHidden,
   };
});
