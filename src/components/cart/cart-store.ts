// Cart line storage: a tiny external store backed by localStorage, read
// through useSyncExternalStore so server and first client render agree.

export type CartItem = { handle: string; variantId: string; quantity: number };

const STORAGE_KEY = "zulva:cart:v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] | null = null;
const listeners = new Set<() => void>();

function load(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Storage can be unavailable (private mode); the cart still works in memory.
    return [];
  }
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    // Keep tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      items = load();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartItem[] {
    if (items === null) items = load();
    return items;
  },
  getServerSnapshot(): CartItem[] {
    return EMPTY;
  },
  update(fn: (current: CartItem[]) => CartItem[]) {
    items = fn(cartStore.getSnapshot());
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
    listeners.forEach((l) => l());
  },
};
