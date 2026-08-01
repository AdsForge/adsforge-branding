/*
  Shared button styles. Two variants only:
  - primary: the gold accent, reserved for the main conversion action
  - secondary: quiet hairline border
*/
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent-fill px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-fill-hover active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-edge-strong px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-faint hover:bg-foreground/4 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
