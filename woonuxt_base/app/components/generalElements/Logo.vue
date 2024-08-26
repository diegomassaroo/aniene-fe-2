<script setup lang="ts">
const { siteName } = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const img = useImage();

const faviconUrl = '/logo.svg';
</script>

<template>
  <NuxtLink to="/">
    <img :src="faviconUrl" alt="Logo" class="object-contain h-7" />
  </NuxtLink>
</template>
