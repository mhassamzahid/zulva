"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { getProduct, type Product, type ProductVariant } from "@/lib/catalog";
import { cartStore, type CartItem } from "@/components/cart/cart-store";

export const MAX_QUANTITY = 10;

export type CartLine = CartItem & {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
};

const clamp = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, n));

function resolveLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = getProduct(item.handle);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    if (!product || !variant) return [];
    return [{ ...item, product, variant, lineTotal: variant.price * item.quantity }];
  });
}

const noop = () => () => {};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** False during SSR and the hydration pass, before stored lines are read. */
  ready: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (open: boolean) => void;
  add: (handle: string, variantId: string, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const ready = useSyncExternalStore(noop, () => true, () => false);
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((handle: string, variantId: string, quantity = 1) => {
    cartStore.update((current) => {
      const existing = current.find((i) => i.variantId === variantId);
      if (existing) {
        return current.map((i) =>
          i.variantId === variantId ? { ...i, quantity: clamp(i.quantity + quantity) } : i
        );
      }
      return [...current, { handle, variantId, quantity: clamp(quantity) }];
    });
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    cartStore.update((current) =>
      current.map((i) => (i.variantId === variantId ? { ...i, quantity: clamp(quantity) } : i))
    );
  }, []);

  const remove = useCallback((variantId: string) => {
    cartStore.update((current) => current.filter((i) => i.variantId !== variantId));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveLines(items);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      ready,
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      setOpen,
      add,
      setQuantity,
      remove,
    };
  }, [items, ready, isOpen, add, setQuantity, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
