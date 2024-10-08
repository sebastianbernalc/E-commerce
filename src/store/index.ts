import { create } from "zustand";

// Define el tipo Product con una cantidad
export type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
  reviews_number: number;
  summary: string;
  image: string;
  quantity?: number; // Añadido el campo quantity opcional
};

type StoreState = {
  products: Product[];
  cart: Product[]; // Estado para el carrito
  itemCount: number; // Puedes eliminar este si ya no lo necesitas
  setProducts: (products: Product[]) => void;
  incrementCount: (productId: string) => void; // Modificado para recibir productId
  decrementCount: (productId: string) => void; // Modificado para recibir productId
  resetCount: () => void; // Esto lo puedes eliminar si ya no lo necesitas
  addToCart: (product: Product, quantity: number) => void; // Función para añadir al carrito
  removeFromCart: (productId: string) => void; // Función para eliminar del carrito
  updateItemCount: (productId: string, quantity: number) => void; // Función para actualizar la cantidad de un producto en el carrito
};

export const useAppStore = create<StoreState>((set) => ({
  products: [],
  cart: [],
  itemCount: 1, // Puedes eliminar esto si ya no lo necesitas
  setProducts: (products) => set({ products }),

  // Incrementa la cantidad de un producto específico en el carrito
  incrementCount: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.quantity && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  // Decrementa la cantidad de un producto específico en el carrito
  decrementCount: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.quantity && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  resetCount: () => set({ itemCount: 1 }), // Puedes eliminar esto si ya no lo necesitas

  addToCart: (product, quantity) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) + quantity }
              : item
          ),
        };
      } else {
        // Si el producto no está en el carrito, añádelo con la cantidad seleccionada
        return {
          cart: [...state.cart, { ...product, quantity }],
        };
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  updateItemCount: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
}));
