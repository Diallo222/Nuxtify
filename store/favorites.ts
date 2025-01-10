import { defineStore } from "pinia";

import type Product from "./types";
export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as Product[],
  }),
  actions: {
    loadFavorites() {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites) as Product[];
      }
    },
    isFavorite(product: Product) {
      return this.favorites.some((item) => item.id === product.id);
    },
    switchFavorite(product: Product) {
      if (this.isFavorite(product)) {
        this.favorites = this.favorites.filter(
          (item) => item.id !== product.id
        );
      } else {
        this.favorites.push(product);
      }
      this.saveFavorites();
    },
    saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },
  },
});
