import gsap from "gsap";

export function useGsapContext(scope?: Ref<HTMLElement | null> | HTMLElement) {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const el =
      scope && "value" in (scope as Ref<HTMLElement | null>)
        ? (scope as Ref<HTMLElement | null>).value
        : (scope as HTMLElement | undefined);

    ctx = gsap.context(() => {}, el ?? undefined);
  });

  onUnmounted(() => {
    ctx?.revert();
    ctx = null;
  });

  return {
    add(fn: gsap.ContextFunc | (() => void)) {
      if (ctx) {
        ctx.add(fn);
      } else {
        fn();
      }
    },
    revert() {
      ctx?.revert();
    },
  };
}
