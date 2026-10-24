import { site, whatsappHref } from "@/lib/site";

/** Floating WhatsApp entry point. Falls back to /contact until a number is set. */
export function WhatsAppButton() {
  const live = Boolean(site.whatsappNumber);

  return (
    <a
      href={whatsappHref("Hi Zulva, I have a question about your products.")}
      target={live ? "_blank" : undefined}
      rel={live ? "noreferrer" : undefined}
      aria-label={live ? "Chat with Zulva on WhatsApp" : "Contact Zulva"}
      // Product pages set data-sticky-bar on <body> while the mobile add-to-bag bar shows.
      data-whatsapp
      className="fixed right-4 bottom-4 z-30 inline-flex size-12 items-center justify-center gap-2 rounded-full bg-[#1f7a4d] text-[0.9375rem] text-white transition-[bottom,transform,background-color] duration-300 ease-quint hover:-translate-y-0.5 hover:bg-[#186640] md:right-6 md:bottom-6 md:w-auto md:pr-5 md:pl-4 max-md:in-data-sticky-bar:bottom-[5.75rem]"
    >
      <WhatsAppGlyph />
      <span className="max-md:sr-only">WhatsApp</span>
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.57c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}
