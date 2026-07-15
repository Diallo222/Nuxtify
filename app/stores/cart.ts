import { defineStore } from "pinia";
import type Product from "./types";

export type ShippingDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
};

export type OrderLine = Product & { quantity: number };

export type LastOrder = {
  id: string;
  items: OrderLine[];
  total: number;
  shipping: ShippingDetails;
  placedAt: string;
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    basket: [] as Product[],
    lastOrder: null as LastOrder | null,
  }),
  actions: {
    inCart(id: number): boolean {
      return this.basket.some((item) => item.id === id);
    },
    addProduct(product: Product, quantity: number = 1): void {
      const exist = this.basket.find((item) => item.id === product.id);
      if (exist) {
        exist.quantity = (exist.quantity || 0) + (quantity > 0 ? quantity : 1);
      } else {
        this.basket.push({
          ...product,
          quantity: quantity > 0 ? quantity : 1,
        });
      }
    },
    decreaseQuantity(product: Product): void {
      const exist = this.basket.find((item) => item.id === product.id);
      if (exist && exist.quantity && exist.quantity > 1) {
        exist.quantity--;
      }
    },
    removeProduct(product: Product): void {
      this.basket = this.basket.filter((item) => item.id !== product.id);
    },
    totalAmount(): number {
      return this.basket.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
      );
    },
    clearBasket(): void {
      this.basket = [];
    },
    placeOrder(shipping: ShippingDetails): LastOrder {
      const items: OrderLine[] = this.basket.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const id = `NX-${Date.now().toString(36).toUpperCase()}`;
      const order: LastOrder = {
        id,
        items,
        total,
        shipping: { ...shipping },
        placedAt: new Date().toISOString(),
      };
      this.lastOrder = order;
      this.clearBasket();
      return order;
    },
  },
});
