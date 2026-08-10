export type CalcItem = {
  slug: string;
  name: string;
  price: number | null;
  image: string | null;
  qty: number;
};

const KEY = "kalkulator_items";
const EVENT = "kalkulator-updated";

export function getItems(): CalcItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function saveItems(items: CalcItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export function addItem(item: Omit<CalcItem, "qty">) {
  const items = getItems();
  const existing = items.find((i) => i.slug === item.slug);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ ...item, qty: 1 });
  }
  saveItems(items);
}

export function removeItem(slug: string) {
  saveItems(getItems().filter((i) => i.slug !== slug));
}

export function updateQty(slug: string, qty: number) {
  const items = getItems();
  const it = items.find((i) => i.slug === slug);
  if (it) {
    it.qty = Math.max(1, qty);
    saveItems(items);
  }
}

export function clearItems() {
  saveItems([]);
}

export function onCalculatorUpdate(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
