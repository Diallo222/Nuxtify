import { defineStore } from "pinia";
import type Product from "./types";

export const useCartStore = defineStore("cart", {
  state: () => ({
    basket: [] as Product[],
  }),
  actions: {
    inCart(id: number): boolean {
      return this.basket.some((item) => item.id === id);
    },
    addProduct(product: Product, quantity: number = 1): void {
      const exist = this.basket.find((item) => item.id === product.id);
      if (exist) {
        exist.quantity += quantity > 0 ? quantity : 1;
      } else {
        this.basket.push({
          ...product,
          quantity: quantity > 0 ? quantity : 1,
        });
      }
    },
    decreaseQuantity(product: Product): void {
      const exist = this.basket.find((item) => item.id === product.id);
      if (exist && exist.quantity > 1) {
        exist.quantity--;
      }
    },
    removeProduct(product: Product): void {
      this.basket = this.basket.filter((item) => item.id !== product.id);
    },
    totalAmount(): number {
      return this.basket.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});
