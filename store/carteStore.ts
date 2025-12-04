import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/store/selector";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  preorder?: boolean; // pour gérer les pre-orders facilement
};

export type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  findItemById: (id: string) => CartItem | null;
  updateQuantity: (id: string, quantity: number) => void;
  updateStockStatus: (serverStock: Record<string, number>) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  totalItems: () => number;
  totalPrice: () => number;
};

const storage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return {
      getItem: (_: string) => null,
      setItem: (_: string, __: string) => {},
      removeItem: (_: string) => {},
    } as unknown as Storage;
  }
  return window.localStorage;
});

export const useCartStore = createSelectors(
  create<CartState>()(
    persist(
      immer((set, get) => ({
        items: [],

        addItem: (item) =>
          set((state) => {
            const idx = state.items.findIndex((i) => i.id === item.id);
            if (idx >= 0) {
              state.items[idx].quantity += item.quantity;
            } else {
              state.items.push(item);
            }
          }),

        removeItem: (id) =>
          set((state) => {
            state.items = state.items.filter((i) => i.id !== id);
          }),

        findItemById: (id: string) => {
          const cartItems = get().items.find((i) => i.id === id);
          return cartItems || null;
        },

        updateQuantity: (id, quantity) =>
          set((state) => {
            const it = state.items.find((i) => i.id === id);
            if (it) {
              if (quantity <= 0) {
                state.items = state.items.filter((i) => i.id !== id);
              } else {
                it.quantity = quantity;
              }
            }
          }),

        updateStockStatus: (serverStock: Record<string, number>) =>
          set((state) => {
            state.items.forEach((item) => {
              if (
                !serverStock[item.id] ||
                serverStock[item.id] < item.quantity
              ) {
                item.preorder = true; // produit plus dispo → passer en précommande
              } else {
                item.preorder = false; // produit dispo → commande normale
              }
            });
          }),

        clearCart: () =>
          set((state) => {
            state.items = [];
          }),

        setItems: (items) =>
          set((state) => {
            state.items = items;
          }),

        // Sélecteurs pour total items et total price
        totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
        totalPrice: () =>
          get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      })),
      {
        name: "cart",
        storage,
      }
    )
  )
);

// Après l'export du store
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "cart" && event.newValue) {
      useCartStore.getState().setItems(JSON.parse(event.newValue));
    }
  });
}
