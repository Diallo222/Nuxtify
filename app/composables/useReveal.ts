import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealVariant = "fade" | "mask";

type RevealOptions = {
  variant?: RevealVariant;
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
};

export function useReveal() {
  const reduced = useReducedMotion();

  const reveal = (
    el: HTMLElement | HTMLElement[] | null,
    options: RevealOptions = {}
  ) => {
    if (!import.meta.client || !el) return;

    const targets = Array.isArray(el) ? el : [el];
    const valid = targets.filter(Boolean);
    if (!valid.length) return;

    const variant = options.variant ?? "fade";

    if (reduced.value) {
      gsap.set(valid, {
        clearProps: "all",
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (variant === "mask") {
      gsap.fromTo(
        valid,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: options.duration ?? 1.1,
          stagger: options.stagger ?? 0.08,
          delay: options.delay ?? 0,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: valid[0],
            start: options.start ?? "top 88%",
            once: true,
          },
        }
      );
      return;
    }

    gsap.fromTo(
      valid,
      { opacity: 0, y: options.y ?? 48 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.9,
        stagger: options.stagger ?? 0.08,
        delay: options.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valid[0],
          start: options.start ?? "top 88%",
          once: true,
        },
      }
    );
  };

  const revealChildren = (
    parent: HTMLElement | null,
    childSelector = "[data-reveal]",
    options: RevealOptions = {}
  ) => {
    if (!import.meta.client || !parent) return;
    const children = parent.querySelectorAll(childSelector);
    if (!children.length) return;
    reveal(Array.from(children) as HTMLElement[], options);
  };

  return { reveal, revealChildren };
}
