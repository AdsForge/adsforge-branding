"use client";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";

/*
  Sonner's `theme="system"` follows the OS, but the site theme is a
  manual toggle stored on <html data-theme>. This wrapper keeps toasts
  in sync with the site's own theme instead.
*/
export default function ThemedToaster() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const el = document.documentElement;
    const read = () =>
      setTheme(el.dataset.theme === "light" ? "light" : "dark");
    read();
    const observer = new MutationObserver(read);
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return <Toaster theme={theme} position="top-right" />;
}
