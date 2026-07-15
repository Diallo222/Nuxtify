import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    menuOpen: false,
    cartOpen: false,
    preloaderDone: false,
    cursorHover: false,
  }),
  actions: {
    openMenu() {
      this.menuOpen = true;
      this.cartOpen = false;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen) this.cartOpen = false;
    },
    openCart() {
      this.cartOpen = true;
      this.menuOpen = false;
    },
    closeCart() {
      this.cartOpen = false;
    },
    toggleCart() {
      this.cartOpen = !this.cartOpen;
      if (this.cartOpen) this.menuOpen = false;
    },
    setPreloaderDone() {
      this.preloaderDone = true;
    },
    setCursorHover(value: boolean) {
      this.cursorHover = value;
    },
  },
});
