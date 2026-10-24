import type { MetadataRoute } from "next";
import { categories, getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collections/all", "/about", "/contact", "/shipping-returns", "/faq"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...categories.map((c) => ({ url: `${site.url}/collections/${c.handle}` })),
    ...getProducts().map((p) => ({
      url: `${site.url}/products/${p.handle}`,
      images: p.images.map((i) => `${site.url}${i.src}`),
    })),
  ];
}
