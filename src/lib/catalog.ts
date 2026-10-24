// Product catalog.
//
// MOCK DATA SOURCE: hand-built from the zulva.pk Shopify storefront snapshot
// (resources/Zulva.html) and the text printed on each product label. Prices,
// handles and variant IDs match Shopify. Nothing here is invented: there are
// no reviews, stock levels or ratings because none were provided.
//
// To go live, replace the functions at the bottom with Shopify Storefront API
// queries that return the same `Product` shape.

export type CategoryHandle = "hair-oil" | "shampoo";

export type Category = {
  handle: CategoryHandle;
  title: string;
  description: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position when the image is cropped into a portrait frame. */
  focus?: string;
};

export type ProductVariant = {
  id: string;
  /** Shopify variant ID, used for the cart permalink checkout handoff. */
  shopifyVariantId: string;
  title: string;
  price: number;
};

export type ProductTone = "amber" | "indigo";

export type Product = {
  handle: string;
  title: string;
  category: CategoryHandle;
  /** One line taken from the label. */
  summary: string;
  description: string[];
  size: string;
  audience: string;
  /** Claims printed on the packaging, quoted as the brand's own. */
  labelClaims: string[];
  keyIngredients: string[];
  badges: string[];
  tone: ProductTone;
  images: ProductImage[];
  variants: ProductVariant[];
};

export const categories: Category[] = [
  {
    handle: "hair-oil",
    title: "Hair oil",
    description: "A herbal oil enriched with 13 essential herbs.",
  },
  {
    handle: "shampoo",
    title: "Shampoo",
    description: "A herbal shampoo with amla, reetha and shikakai.",
  },
];

export const products: Product[] = [
  {
    handle: "zulva-herbal-hair-oil",
    title: "Herbal Hair Oil",
    category: "hair-oil",
    summary: "Enriched with 13 essential herbs.",
    description: [
      "Zulva Herbal Hair Oil is a blend enriched with 13 essential herbs, among them amla, reetha and shikakai.",
      "Made for men and women, it comes in a 150 ml bottle with a flip-top cap.",
    ],
    size: "150 ml / 5.07 fl oz",
    audience: "For men and women",
    labelClaims: [
      "Nourishes scalp",
      "Reduces hair fall",
      "Thicker and stronger hair",
      "Adds natural shine",
    ],
    keyIngredients: ["Amla", "Reetha", "Shikakai"],
    badges: ["13 herbs"],
    tone: "amber",
    images: [
      {
        src: "/images/herbal-hair-oil.jpg",
        alt: "Zulva Herbal Hair Oil, 150 ml amber bottle with a white and gold label, on grey stone",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/herbal-hair-oil-label.jpg",
        alt: "Close view of the Herbal Hair Oil label: enriched with 13 essential herbs",
        width: 800,
        height: 1000,
      },
      {
        src: "/images/hair-oil-ritual.png",
        alt: "Zulva Herbal Hair Oil on a stone plinth beside bowls of amla, black seeds and a red hibiscus",
        width: 1536,
        height: 1024,
        focus: "3% 50%",
      },
    ],
    variants: [
      {
        id: "oil-150ml",
        shopifyVariantId: "50672138748141",
        title: "150 ml",
        price: 1800,
      },
    ],
  },
  {
    handle: "zulva-herbal-shampoo",
    title: "Herbal Shampoo",
    category: "shampoo",
    summary: "A strengthening formula with amla, reetha and shikakai.",
    description: [
      "Zulva Herbal Shampoo is a strengthening formula built around three herbs: amla, reetha and shikakai.",
      "Made for men and women, it comes in a 200 ml bottle with a flip-top cap.",
    ],
    size: "200 ml / 6.76 fl oz",
    audience: "For men and women",
    labelClaims: ["Strengthening formula"],
    keyIngredients: ["Amla", "Reetha", "Shikakai"],
    badges: ["Amla, reetha, shikakai"],
    tone: "indigo",
    images: [
      {
        src: "/images/herbal-shampoo.jpg",
        alt: "Zulva Herbal Shampoo, 200 ml white bottle with a navy and gold label, on grey stone",
        width: 1024,
        height: 1024,
      },
      {
        src: "/images/herbal-shampoo-label.jpg",
        alt: "Close view of the Herbal Shampoo label showing amla, reetha and shikakai",
        width: 800,
        height: 1000,
      },
    ],
    variants: [
      {
        id: "shampoo-200ml",
        shopifyVariantId: "50672050176237",
        title: "200 ml",
        price: 1800,
      },
    ],
  },
];

/** Botanical background on the herbs named on the packaging. */
export const ingredients = [
  {
    name: "Amla",
    botanical: "Phyllanthus emblica",
    note: "Indian gooseberry. A sour green fruit that has been part of South Asian hair care for generations.",
  },
  {
    name: "Reetha",
    botanical: "Sapindus mukorossi",
    note: "Soapnut. Its dried shells foam in water, which is why it was used to wash hair long before bottled shampoo.",
  },
  {
    name: "Shikakai",
    botanical: "Acacia concinna",
    note: "A climbing acacia whose pods are dried and ground. Its name is often translated as fruit for the hair.",
  },
];

export function getProducts() {
  return products;
}

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export function getCategory(handle: string) {
  return categories.find((c) => c.handle === handle);
}

export function getProductsByCategory(handle: CategoryHandle) {
  return products.filter((p) => p.category === handle);
}

export function getRelatedProducts(handle: string) {
  return products.filter((p) => p.handle !== handle);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [
      p.title,
      p.summary,
      p.category,
      getCategory(p.category)?.title ?? "",
      ...p.keyIngredients,
      ...p.description,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export function priceOf(product: Product) {
  return Math.min(...product.variants.map((v) => v.price));
}
