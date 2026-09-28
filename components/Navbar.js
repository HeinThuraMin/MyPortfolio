"use client";

import { useEffect, useState } from "react";
import { nav } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      spy.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur border-b transition ${
        scrolled ? "border-line shadow-[0_6px_24px_rgba(79,70,229,.06)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[78px] w-[min(1140px,100%-40px)] items-center justify-between">
        <a href="#home" className="grad-text text-3xl font-extrabold tracking-tight">
          HEIN<span className="text-p2">.</span>
        </a>

        <button
          className="flex h-8 w-8 flex-col justify-center gap-[5px] md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <i className={`block h-[3px] rounded bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <i className={`block h-[3px] rounded bg-ink transition ${open ? "opacity-0" : ""}`} />
          <i className={`block h-[3px] rounded bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>

        <nav
          className={`fixed inset-x-0 top-[78px] -z-10 flex flex-col bg-white px-5 pb-5 shadow-xl transition md:static md:z-auto md:translate-y-0 md:flex-row md:gap-8 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "translate-y-0" : "-translate-y-[130%]"
          }`}
        >
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`border-b border-line py-3 text-sm font-semibold uppercase tracking-wide transition hover:text-p1 md:border-0 md:py-0 ${
                active === id ? "text-p1" : ""
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
