export type JournalPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string;
  content: string;
};

/** Cover URLs from Unsplash (free license). */
const covers = {
  kinetic:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
  headless:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
  tokens:
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80",
  cart: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
  perf: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  grids:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80",
} as const;


export const journalPosts: JournalPost[] = [
  {
    slug: "kinetic-storefronts-why-motion-converts",
    title: "Kinetic storefronts: why motion converts",
    date: "Jun 28, 2026",
    excerpt:
      "Scroll theater is not decoration — timed reveals and page wipes lower bounce when they serve hierarchy, not noise.",
    tags: ["UX", "Commerce"],
    image: covers.kinetic,
    content: `Shoppers decide in seconds whether a store feels premium or patched together. Motion is one of the fastest signals. When a hero clips in cleanly, categories scrub with intent, and add-to-cart answers with a clear flash, the brain reads craft — which reads trust.

The mistake is animating everything. Kinetic retail works when each section has one job: enter, hold attention, hand off. Mask wipes beat soft fades for image-led commerce because they mimic stage curtains. Lenis-smooth scrolling helps only if ScrollTrigger stays synced; otherwise pins stutter and the “premium” illusion collapses.

For Nuxtify we treat GSAP as lighting, not fireworks. Prefer once-per-viewport reveals, respect prefers-reduced-motion, and keep cart feedback under 300ms. Conversion lifts when motion clarifies what to do next — enter shop, open a collection, commit to cart — not when it delays the path.`,
  },
  {
    slug: "headless-commerce-with-nuxt-and-fake-apis",
    title: "Headless commerce with Nuxt and disposable APIs",
    date: "Jun 12, 2026",
    excerpt:
      "Fake Store is enough to pressure-test UI systems. Here’s how we shape Pinia, deep links, and PDP hydration around a thin API.",
    tags: ["Nuxt", "Dev"],
    image: covers.headless,
    content: `Headless does not mean heavy. A concept store can run on Fake Store while the UI system stays production-shaped: typed products, category routes, cart and favorites as client stores, auth gated only where demos need it.

The PDP deep-link rule is non-negotiable. If selectedProduct lives only in memory, refresh breaks the show. Fetch by id when the route param disagrees with the store. Categories should load as soon as the strip mounts — not after a scrub has already measured an empty track.

Pinia stays thin: fetch, select, mutate cart. Presentation stays in components. That split lets you swap Fake Store for Shopify Hydrogen, Medusa, or a custom Nitro API later without redesigning the kinetic layer. Build the stage first; replace the warehouse when the brand is ready.`,
  },
  {
    slug: "design-tokens-that-survive-awards-season",
    title: "Design tokens that survive awards season",
    date: "May 30, 2026",
    excerpt:
      "Ink, paper, and one acid accent beat purple gradients. A token file keeps admin, cart, and journal in one voice.",
    tags: ["Design", "System"],
    image: covers.tokens,
    content: `Award-site energy dies when marketing uses black glass and admin still ships indigo buttons. Tokens fix that. Four colors — ink canvas, paper text, ash meta, one chartreuse accent — cover CTAs, focus rings, badges, and progress bars without a second palette.

Typography does the heavy lifting. Syne for display, DM Sans for body. Oversized tracking-tight headlines earn the brand test: remove the nav and the viewport still says Nuxtify. Near-zero radius keeps the architecture sharp; pills and multi-shadow cards dilute it.

Put tokens in CSS \`@theme\` so Tailwind utilities stay honest. Document motion rules beside color: reveal variants, when to pin, when to scrub. When journal, checkout, and admin share the same ink-and-accent language, the whole product feels like one flagship — not three templates glued together.`,
  },
  {
    slug: "cart-drawers-vs-cart-pages",
    title: "Cart drawers vs cart pages",
    date: "May 9, 2026",
    excerpt:
      "Quick-add wants a drawer. Checkout wants a page. Here’s how we split the two without stranding mobile shoppers.",
    tags: ["UX", "Commerce"],
    image: covers.cart,
    content: `A drawer is a rehearsal; checkout is opening night. Quick-add should open a slide-over so momentum stays on the grid. Line-item edits, totals, and “proceed” live there — but payment forms need a full route with room for validation, summary, and calm focus states.

On touch devices, hover-only add-to-cart is a silent failure. Keep a persistent quick-add on small screens; keep hover reveal on desktop. After add, flash the card and bump the bag badge — then optionally open the drawer so the shopper sees the object landed.

Never clear the basket on route change. Only clear after a successful (even demo) payment. Empty states should sell the next click: point to categories with the same accent CTA language as the hero.`,
  },
  {
    slug: "perf-budget-for-gsap-storefronts",
    title: "A performance budget for GSAP storefronts",
    date: "Apr 22, 2026",
    excerpt:
      "Smooth scroll and pinned strips are free until images and plugins fight the main thread. Budget motion like you budget JS.",
    tags: ["Dev", "Perf"],
    image: covers.perf,
    content: `Kinetic UI fails loudly: janky pins, late fonts, Image bloat. Budget early. Register ScrollTrigger once. Kill triggers on unmount. Prefer \`transform\` and \`clip-path\` over layout-thrashing properties. With Lenis, keep ScrollTrigger updated from the Lenis scroll event and use \`pinType: "transform"\` when pinning horizontal stages.

Images: \`@nuxt/image\`, explicit domains, contain vs cover chosen on purpose — hero cover, product contain on ink panels. Don’t preloader-block forever; finish the brand bar and let the catalog hydrate.

Ship reduced-motion paths that skip scrub and entrance stacks entirely. Desktop wow is worthless if mobile main-thread time spikes. Measure LCP on home with the first product image as hero; if Fake Store latency hurts, stage a local fallback plate.`,
  },
  {
    slug: "editorial-grids-beat-product-walls",
    title: "Editorial grids beat product walls",
    date: "Apr 4, 2026",
    excerpt:
      "Four equal cards say “catalog.” One featured tile and a staggered mosaic say “curation.”",
    tags: ["Design", "Merch"],
    image: covers.grids,
    content: `General merchandise APIs return flat lists. Your job is hierarchy. Lead Latest with a double-span featured piece, then denser tiles. Category strips should feel like aisles — horizontal, named, image-led — not a second homepage grid.

Copy stays short. Category labels and prices do the sorting; titles truncate with intent. Ratings stay ash meta. Accent is for action: shop now, quick add, checkout.

When fashion, jewelry, and electronics share one floor, typography and motion do the branding that the SKU list cannot. That is the concept-store bet: one stage, many props.`,
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((post) => post.slug === slug);
}

export function getJournalPosts(): JournalPost[] {
  return journalPosts;
}
