"use client";

import { useActionState } from "react";
import { subscribe, type NewsletterState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initial: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initial);

  return (
    <form action={action} className="w-full max-w-md" noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center border-b border-stone/40 focus-within:border-stone">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Your email address"
          aria-describedby="newsletter-status"
          aria-invalid={state.status === "error" || undefined}
          className="h-12 min-w-0 flex-1 bg-transparent text-base text-stone placeholder:text-stone/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="h-12 shrink-0 pl-4 text-[0.9375rem] text-stone link-draw disabled:opacity-50"
        >
          {pending ? "Subscribing" : "Subscribe"}
        </button>
      </div>
      <p
        id="newsletter-status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-5 text-sm",
          state.status === "error" ? "text-foil" : "text-stone/70"
        )}
      >
        {state.message}
      </p>
    </form>
  );
}
