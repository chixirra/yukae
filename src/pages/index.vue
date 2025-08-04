<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold text-violet-400">
      {{ platform }}
    </h1>
    <Button @click="getPlatformOnClick">Click me to get platform</Button>
  </div>
</template>

<script setup lang="ts">
import { getPlatform } from "@/lib/getPlatform";

const platform = ref<"mobile" | "desktop" | "website" | null>(null);

const getPlatformOnClick = () => {
  platform.value = getPlatform();
};
</script>
