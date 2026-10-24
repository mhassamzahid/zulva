"use server";

export type NewsletterState = { status: "idle" | "success" | "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Newsletter sign-up. Point NEWSLETTER_WEBHOOK_URL at your email provider
// (Shopify Flow, Klaviyo, a Google Sheet webhook...). Until it is set, the form
// says plainly that sign-up is not connected rather than pretending to succeed.
export async function subscribe(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL.test(email)) {
    return { status: "error", message: "Enter an email address like name@example.com." };
  }

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    return {
      status: "error",
      message: "Email sign-up isn't connected yet. Follow @zulva.pk on Instagram for news in the meantime.",
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "zulva.pk footer" }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return { status: "error", message: "We couldn't save your email. Try again in a moment." };
  }

  return { status: "success", message: "You're subscribed. We'll write when there's something new." };
}
