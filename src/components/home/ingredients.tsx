import { ingredients } from "@/lib/catalog";

export function Ingredients() {
  return (
    <section
      aria-labelledby="ingredients-heading"
      className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12"
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <h2 id="ingredients-heading" className="font-display text-headline text-balance">
            What&rsquo;s in the bottle
          </h2>
          <p className="mt-5 max-w-[38ch] text-ink-soft">
            Both labels name the same three herbs. The oil adds ten more, for 13
            in all. Here is where the three come from.
          </p>
        </div>
      </div>

      <dl className="lg:col-span-7 lg:col-start-6">
        {ingredients.map((item) => (
          <div
            key={item.name}
            className="grid gap-x-10 gap-y-3 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:py-10"
          >
            <dt>
              <span className="block font-display text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-none">
                {item.name}
              </span>
              <span className="mt-3 block text-sm italic text-ink-soft">
                {item.botanical}
              </span>
            </dt>
            <dd className="max-w-[44ch] text-pretty leading-relaxed text-ink md:pt-3">
              {item.note}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
