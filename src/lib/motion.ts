/*
  Shared motion vocabulary. One easing curve, one entrance pattern,
  springs for anything the pointer touches.
*/
export const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING = { type: "spring", stiffness: 400, damping: 32 } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
} as const;

export const stagger = (delayChildren = 0, staggerChildren = 0.06) =>
  ({
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  }) as const;

export const VIEWPORT = { once: true, margin: "-64px" } as const;
