<template>
   <component :is="device.isMobile ? Mobile : Desktop" v-bind="$props" />
</template>

<script lang="ts" setup>
import Desktop from "./TrackList.desktop.vue";
import Mobile from "./TrackList.mobile.vue";

const device = useDevice();
</script>

<style></style>
