import { defineStore } from "pinia";

let defaultValue = "theme-4";
export const useColorSchemeStore = defineStore("colorScheme", {
  state: () => ({
    colorSchemeValue:
      localStorage.getItem("colorScheme") === null
        ? defaultValue
        : localStorage.getItem("colorScheme"),
  }),
  getters: {
    colorScheme(state) {
      if (localStorage.getItem("colorScheme") === null) {
        localStorage.setItem("colorScheme", defaultValue);
      }

      return state.colorSchemeValue;
    },
  },
  actions: {
    setColorScheme(colorScheme) {
      localStorage.setItem("colorScheme", colorScheme);
      this.colorSchemeValue = colorScheme;
    },
  },
});
