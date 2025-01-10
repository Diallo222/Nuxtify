import { defineStore } from "pinia";

import type Product from "./types";
export const useCartStore = defineStore("cart", {
  state: () => ({
    basket: [],
  }),
  actions: {
    addProduct(product: Product) {
      const exist = this.basket.find((item) => item.id === product.id);
      if (exist) {
        exist.quantity++;
      } else {
        this.basket.push({
          ...product,
          quantity: 1,
        });
      }
    },
    removeProduct(product: Product) {
      this.basket = this.basket.filter((item) => item.id !== product.id);
    },
  },
});
