<template>
   <component
      :is="device.isMobile ? Mobile : Desktop"
      v-bind="($props as any)"
   />
</template>

<script lang="ts" setup>
import Desktop from "./TrackListEntry.desktop.vue";
import Mobile from "./TrackListEntry.mobile.vue";

const device = useDevice();
</script>

<style></style>
