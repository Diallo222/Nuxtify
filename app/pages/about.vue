<template lang="pug">
  .px-5.py-16(class="md:px-10 lg:px-16")
    .max-w-5xl
      p.text-accent.text-xs.uppercase(class="tracking-[0.3em]") About
      h1.font-display.font-extrabold.uppercase.tracking-tighter.leading-none.mt-4(
        class="text-[14vw] md:text-8xl"
      ) NUXTIFY
      Reveal
        p.text-2xl.text-paper.mt-10.max-w-2xl.leading-snug(class="md:text-3xl")
          | Not a template — a kinetic concept store where fashion, jewelry, and electronics share one stage.
    .grid.gap-16.mt-24(class="md:grid-cols-3")
      Reveal(v-for="(block, i) in blocks" :key="block.title" :delay="i * 0.1")
        p.text-xs.uppercase.tracking-widest.text-accent {{ block.kicker }}
        h2.font-display.font-bold.uppercase.tracking-tight.text-2xl.mt-3 {{ block.title }}
        p.text-ash.mt-4.leading-relaxed {{ block.body }}
</template>

<script setup lang="ts">
const blocks = [
  {
    kicker: "01",
    title: "Mission",
    body: "Stage premium retail as theater — bold type, full-bleed imagery, motion that feels intentional.",
  },
  {
    kicker: "02",
    title: "Speed",
    body: "Signal-fast delivery as a promise of the brand — always on cue, never waiting in the wings.",
  },
  {
    kicker: "03",
    title: "Support",
    body: "Human replies that treat every shopper like an opening-night guest.",
  },
];
</script>
