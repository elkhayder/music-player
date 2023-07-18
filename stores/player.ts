import { defineStore } from "pinia";
import { useTracksStore } from "./tracks";

export const usePlayerStore = defineStore("player", () => {
   const trackStore = useTracksStore();
   const context = ref<AudioContext | null>(null);
   const audio = ref<HTMLAudioElement | null>(null);

   var isAutoLoaded = true;

   const Setup = () => {
      // context.value = new AudioContext();
      audio.value = document.getElementById("audio-player") as HTMLAudioElement;
      // audio.value.crossOrigin = "anonymous";
      // const source = context.value.createMediaElementSource(audio.value);
      // source.connect(context.value.destination);

      audio.value.addEventListener("ended", () => {
         isPlaying.value = false;
         currentTime.value = 0;
         if (trackStore.isOnRepeat) {
            trackStore.setCurrentTrackIndex(trackStore.currentTrackIndex!);
         } else {
            trackStore.nextTrack();
         }
      });

      audio.value.addEventListener("play", () => {
         isPlaying.value = !audio.value!.paused;
      });
      audio.value.addEventListener("playing", () => {
         isPlaying.value = !audio.value!.paused;
      });

      audio.value.addEventListener("pause", () => {
         isPlaying.value = !audio.value!.paused;
      });

      audio.value.addEventListener("error", () => {
         isPlaying.value = !audio.value!.paused;
         console.log("Error playing audio");
      });

      audio.value.addEventListener("loadeddata", () => {
         isLoaded.value = true;

         if (!isAutoLoaded) {
            audio.value!.play();
         } else {
            isAutoLoaded = false;
         }

         totalDuration.value = audio.value!.duration;
      });

      audio.value.addEventListener("timeupdate", () => {
         currentTime.value = audio.value!.currentTime;
      });

      // window.addEventListener("keydown", (e) => {
      //    if (trackStore.currentTrackIndex === null || !isLoaded.value) return;

      //    const Handlers = [
      //       {
      //          key: "Space",
      //          handler: togglePlay,
      //       },
      //       {
      //          key: "ArrowUp",
      //          handler: trackStore.previousTrack,
      //       },
      //       {
      //          key: "ArrowDown",
      //          handler: trackStore.nextTrack,
      //       },
      //       {
      //          key: "ArrowLeft",
      //          handler: () => setRelativeTime(-2),
      //       },
      //       {
      //          key: "ArrowRight",
      //          handler: () => setRelativeTime(2),
      //       },
      //       {
      //          key: "KeyS",
      //          handler: trackStore.toggleShuffle,
      //       },
      //       {
      //          key: "KeyR",
      //          handler: trackStore.toggleRepeat,
      //       },
      //    ];

      //    if (Handlers.findIndex((x) => x.key == e.code) === -1) return;

      //    Handlers.find((x) => x.key == e.code)!.handler();
      // });
   };

   const isPlaying = ref(false);
   const togglePlay = () => {
      if (!isLoaded) return;

      if (audio.value!.paused) {
         audio.value!.play();
      } else {
         audio.value!.pause();
      }
   };

   const isLoaded = ref(false);

   const volume = ref(0.8);
   const setVolume = (value: number) => {
      volume.value = value;
      audio.value!.volume = value;
   };

   const currentTime = ref(0);
   const totalDuration = ref(0);

   const setTime = (time: number) => {
      audio.value!.currentTime = time;
   };

   const setRelativeTime = (time: number) => {
      audio.value!.currentTime += time;
   };

   const setAudioSrc = (src: string) => {
      if (!context.value) {
         Setup();
      }

      totalDuration.value = 0;
      audio.value!.src = src;
   };

   return {
      audio,
      setAudioSrc,
      isPlaying,
      togglePlay,
      isLoaded,
      volume,
      setVolume,
      currentTime,
      totalDuration,
      setTime,
      setRelativeTime,
   };
});
