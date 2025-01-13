import { defineStore } from "pinia";

import type Product from "./types";
export const useCartStore = defineStore("cart", {
  state: () => ({
    basket: [],
  }),
  actions: {
    addProduct(product: any, quantity: number) {
      const exist = this.basket.find((item) => item.id === product.id);
      if (exist) {
        exist.quantity++;
      } else {
        this.basket.push({
          ...product,
          quantity: quantity || 1,
        });
      }
    },
    removeProduct(product: Product) {
      this.basket = this.basket.filter((item) => item.id !== product.id);
    },
  },
});
