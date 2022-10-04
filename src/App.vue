<template>
  <router-view />
</template>
<script setup>
  import { computed } from "vue";
  import { useDarkModeStore } from "@/stores/dark-mode";
  import { useColorSchemeStore } from "@/stores/color-scheme";
  import dom from "@left4code/tw-starter/dist/js/dom";

  const darkModeStore = useDarkModeStore();
  const darkMode = computed(() => darkModeStore.darkMode);
  const colorSchemeStore = useColorSchemeStore();
  const colorScheme = computed(() => colorSchemeStore.colorScheme);

  const setColorSchemeClass = () => {
    dom("html")
            .attr("class", colorScheme.value)
            .addClass(darkMode.value ? "dark" : "");
  };

  const switchColorScheme = (colorScheme) => {
    colorSchemeStore.setColorScheme(colorScheme);
    setColorSchemeClass();
  };

  setColorSchemeClass();
</script>
