import { defineStore } from "pinia";

import type Product from "./types";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    productsLoading: false,
    categories: [] as string[],
    catLoading: false,
    categoryProducts: [] as Product[],
    catProductsLoading: false,
    selectedProduct: null as Product | null,
  }),
  actions: {
    async fetchProducts() {
      this.productsLoading = true;
      try {
        const data = await useApi("/products", { method: "GET" });
        this.products = data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        this.productsLoading = false;
      }
    },
    async fetchCategories() {
      this.catLoading = true;
      try {
        const data = await useApi("/products/categories", { method: "GET" });
        this.categories = data;
        console.log("Products for category:", data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        this.catLoading = false;
      }
    },
    async fetchCategoryProducts(category: string) {
      this.catProductsLoading = true;
      try {
        const data = await useApi(`/products/category/${category}`, {
          method: "GET",
        });
        this.categoryProducts = await data;
      } catch (error) {
        console.error("Failed to fetch products for category:", error);
      } finally {
        this.catProductsLoading = false;
      }
    },
    setProduct(product: Product) {
      this.selectedProduct = product;
    },
    clearProduct() {
      this.selectedProduct = null;
    },
  },
  getters: {
    allProducts: (state) => state.products,
    allCategories: (state) => state.categories,
    loading: (state) => state.productsLoading,
  },
});
