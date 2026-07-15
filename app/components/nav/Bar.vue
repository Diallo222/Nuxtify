<template lang="pug">
  header.fixed.top-0.left-0.right-0.z-50.px-5.py-4.transition-colors.duration-300(
    class="md:px-10"
    :class="scrolled ? 'bg-ink-70 backdrop-blur-md border-b border-white-10' : 'bg-transparent'"
  )
    .flex.items-center.justify-between.gap-4
      Magnetic(tag="div" :strength="0.2")
        button.font-display.font-bold.uppercase.tracking-widest.text-xs.text-paper.flex.items-center.gap-2(
          type="button"
          class="md:text-sm hover:text-accent"
          @click="onMenuToggle"
          data-cursor="hover"
        )
          span {{ ui.menuOpen ? 'Close' : 'Menu' }}

      Magnetic(tag="div" :strength="0.25")
        NuxtLink.font-display.font-extrabold.uppercase.tracking-tighter.text-2xl.text-paper(
          to="/"
          class="md:text-3xl hover:text-accent"
          data-cursor="hover"
        ) Nuxtify

      .flex.items-center.gap-4(class="md:gap-6")
        NuxtLink.text-paper.transition-colors.hidden(to="/favorites" class="md:inline-flex hover:text-accent" aria-label="Favorites" data-cursor="hover")
          Icon(name="mdi:heart-outline" size="1.35em")
        button.relative.text-paper.transition-colors(
          type="button"
          aria-label="Open cart"
          class="hover:text-accent"
          data-cursor="hover"
          @click="ui.toggleCart"
        )
          Icon(name="mdi:shopping-outline" size="1.35em")
          span.absolute.-top-2.-right-2.min-w-4.h-4.px-1.bg-accent.text-ink.font-bold.flex.items-center.justify-center(
            class="text-[10px]"
            v-if="count"
          ) {{ count }}
        NuxtLink.text-paper.transition-colors(to="/login" class="hover:text-accent" aria-label="Account" data-cursor="hover")
          Icon(name="mdi:account-outline" size="1.35em")

  Teleport(to="body")
    .fixed.inset-0.bg-ink.pointer-events-none.opacity-0(
      class="z-[80]"
      ref="overlay"
      :class="{ 'pointer-events-auto': menuVisible }"
      v-show="menuVisible"
    )
      .absolute.inset-0.px-8.py-24.flex.flex-col.justify-center(class="md:px-16")
        nav.flex.flex-col.gap-2(class="md:gap-4")
          NuxtLink.menu-link.font-display.font-extrabold.uppercase.tracking-tighter.text-5xl.text-paper.overflow-hidden(
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="md:text-7xl lg:text-8xl hover:text-accent"
            data-cursor="hover"
            @click="closeMenu"
          )
            span.inline-block(data-menu-item) {{ link.label }}
        .mt-16.flex.flex-wrap.gap-6.text-xs.uppercase.tracking-widest.text-ash(data-menu-meta)
          a(href="https://github.com" target="_blank" rel="noopener" class="hover:text-accent") GitHub
          a(href="https://twitter.com" target="_blank" rel="noopener" class="hover:text-accent") X
          NuxtLink(to="/admin" class="hover:text-accent" @click="closeMenu") Admin
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useCartStore } from "~/stores/cart";
import { useUiStore } from "~/stores/ui";

const ui = useUiStore();
const cart = useCartStore();
const scrolled = ref(false);
const overlay = ref<HTMLElement | null>(null);
const menuVisible = ref(false);
const closing = ref(false);
const reduced = useReducedMotion();

const count = computed(() =>
  cart.basket.reduce((acc, item) => acc + (item.quantity || 0), 0)
);

const links = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/categories" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "Favorites", to: "/favorites" },
];

const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};

const openMenu = async () => {
  ui.openMenu();
  menuVisible.value = true;
  await nextTick();
  if (!overlay.value) return;

  document.body.style.overflow = "hidden";
  const items = overlay.value.querySelectorAll("[data-menu-item]");
  const meta = overlay.value.querySelector("[data-menu-meta]");

  if (reduced.value) {
    gsap.set(overlay.value, { opacity: 1 });
    gsap.set(items, { y: 0, opacity: 1 });
    if (meta) gsap.set(meta, { opacity: 1 });
    return;
  }

  gsap.set(overlay.value, { opacity: 0 });
  gsap.set(items, { y: 80, opacity: 0 });
  if (meta) gsap.set(meta, { opacity: 0 });

  const tl = gsap.timeline();
  tl.to(overlay.value, { opacity: 1, duration: 0.35, ease: "power2.out" }).to(
    items,
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" },
    "-=0.1"
  );
  if (meta) {
    tl.to(meta, { opacity: 1, duration: 0.4 }, "-=0.35");
  }
};

const closeMenu = async () => {
  if (closing.value || !menuVisible.value) {
    ui.closeMenu();
    return;
  }
  closing.value = true;

  if (!overlay.value || reduced.value) {
    menuVisible.value = false;
    ui.closeMenu();
    document.body.style.overflow = "";
    closing.value = false;
    return;
  }

  const items = overlay.value.querySelectorAll("[data-menu-item]");
  const meta = overlay.value.querySelector("[data-menu-meta]");

  await gsap
    .timeline({
      onComplete: () => {
        menuVisible.value = false;
        ui.closeMenu();
        document.body.style.overflow = "";
        closing.value = false;
      },
    })
    .to(items, {
      y: -40,
      opacity: 0,
      duration: 0.35,
      stagger: 0.04,
      ease: "power2.in",
    })
    .to(meta, { opacity: 0, duration: 0.2 }, 0)
    .to(overlay.value, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.1");
};

const onMenuToggle = () => {
  if (ui.menuOpen || menuVisible.value) closeMenu();
  else openMenu();
};

watch(
  () => ui.menuOpen,
  (open) => {
    if (open && !menuVisible.value) openMenu();
    if (!open && menuVisible.value && !closing.value) closeMenu();
  }
);

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.bg-ink-70 {
  background-color: color-mix(in srgb, var(--color-ink) 70%, transparent);
}
.border-white-10 {
  border-color: color-mix(in srgb, white 10%, transparent);
}
</style>
