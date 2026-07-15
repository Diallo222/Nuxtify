<template lang="pug">
  footer.relative.mt-24.overflow-hidden.border-t.border-white-10(ref="root")
    .pointer-events-none.absolute.inset-0.footer-glow(aria-hidden="true")

    .relative.px-5.pt-16(class="md:px-10 lg:px-16 md:pt-24")
      .overflow-hidden
        NuxtLink.block.font-display.font-extrabold.uppercase.tracking-tighter.leading-none.text-paper.transition-colors(
          to="/"
          class="text-[18vw] md:text-[12vw] lg:text-[9vw] hover:text-accent"
          data-cursor="hover"
          data-footer-brand
        ) NUXTIFY

      .grid.gap-12.mt-12.pb-16(class="lg:grid-cols-12 lg:gap-8 lg:mt-16 lg:pb-20")
        .space-y-5(class="lg:col-span-5" data-footer-reveal)
          p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") Concept store
          p.max-w-sm.text-ash.text-sm.leading-relaxed(class="md:text-base")
            | Fashion, jewelry, and electronics — staged as one kinetic retail experience.
          Magnetic.inline-block(tag="div")
            NuxtLink.inline-flex.items-center.gap-2.bg-accent.text-ink.font-display.font-bold.uppercase.tracking-wide.px-6.py-3.text-xs(
              to="/categories"
              data-cursor="hover"
            )
              span Enter shop
              span →

        .grid.gap-10(class="sm:grid-cols-3 lg:col-span-7")
          .space-y-4(data-footer-reveal)
            p.text-ash.text-xs.uppercase.tracking-widest Explore
            nav.flex.flex-col.gap-3
              NuxtLink.footer-link(
                v-for="link in explore"
                :key="link.to"
                :to="link.to"
                data-cursor="hover"
              ) {{ link.label }}

          .space-y-4(data-footer-reveal)
            p.text-ash.text-xs.uppercase.tracking-widest Company
            nav.flex.flex-col.gap-3
              NuxtLink.footer-link(
                v-for="link in company"
                :key="link.to"
                :to="link.to"
                data-cursor="hover"
              ) {{ link.label }}

          .space-y-4(data-footer-reveal)
            p.text-ash.text-xs.uppercase.tracking-widest Connect
            nav.flex.flex-col.gap-3
              a.footer-link(
                v-for="link in social"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener"
                data-cursor="hover"
              ) {{ link.label }}
              NuxtLink.footer-link(to="/admin" data-cursor="hover") Admin

    .relative.border-t.border-white-10.px-5.py-6(class="md:px-10 lg:px-16")
      .flex.flex-col.gap-4.justify-between.text-ash.text-xs.uppercase.tracking-widest(
        class="md:flex-row md:items-center"
        data-footer-reveal
      )
        span © {{ year }} Nuxtify
        .flex.flex-wrap.gap-x-6.gap-y-2
          span Kinetic concept store
          span Fake Store demo
          button.text-left.transition-colors(
            type="button"
            class="hover:text-accent"
            data-cursor="hover"
            @click="scrollTop"
          ) Back to top ↑
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const year = new Date().getFullYear();
const root = ref<HTMLElement | null>(null);
const reduced = useReducedMotion();

const explore = [
  { label: "Categories", to: "/categories" },
  { label: "Favorites", to: "/favorites" },
  { label: "Cart", to: "/cart" },
];

const company = [
  { label: "About", to: "/about" },
  { label: "Journal", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const social = [
  { label: "GitHub", href: "https://github.com/Diallo222/Nuxtify" },
  { label: "X", href: "https://twitter.com" },
];

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: reduced.value ? "auto" : "smooth" });
};

onMounted(() => {
  if (!root.value || reduced.value) return;
  gsap.registerPlugin(ScrollTrigger);

  const brand = root.value.querySelector("[data-footer-brand]");
  const reveals = root.value.querySelectorAll("[data-footer-reveal]");

  if (brand) {
    gsap.fromTo(
      brand,
      { y: 48, opacity: 0.35 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.value,
          start: "top 85%",
          once: true,
        },
      }
    );
  }

  if (reveals.length) {
    gsap.fromTo(
      reveals,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.value,
          start: "top 80%",
          once: true,
        },
      }
    );
  }
});
</script>

<style scoped>
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}

.footer-glow {
  background: radial-gradient(
    ellipse 80% 60% at 10% 100%,
    color-mix(in srgb, var(--color-accent) 8%, transparent),
    transparent 55%
  );
}

.footer-link {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-paper);
  transition: color 0.25s ease, transform 0.25s ease;
  width: fit-content;
}

.footer-link:hover {
  color: var(--color-accent);
  transform: translateX(4px);
}
</style>
