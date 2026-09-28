"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface Cert {
  title: string;
  issuer: string;
  tag: string;
  from: string;
  to: string;
}

/**
 * Pinned, scroll-scrubbed gallery: cards sweep along an arc as you scroll.
 */
export default function CertGallery({ certs }: { certs: Cert[] }) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>(".cert-card", root);
      const n = cards.length;

      const layout = (t: number) => {
        const step = Math.min(330, root.clientWidth * 0.62);
        // centre position sweeps from just before the first card to just past the last
        const c = t * (n + 1) - 1;
        cards.forEach((card, i) => {
          const o = i - c;
          const a = Math.abs(o);
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: o * step,
            y: o * o * 26,
            rotation: o * 9,
            scale: 1 - Math.min(a, 3) * 0.05,
            opacity: gsap.utils.clamp(0, 1, 3.2 - a),
            zIndex: 100 - Math.round(a * 10),
          });
        });
      };

      layout(0);

      const st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: `+=${n * 70}%`,
        pin: true,
        scrub: true,
        onUpdate: (self) => layout(self.progress),
      });

      const onResize = () => layout(st.progress);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: rootRef, dependencies: [certs.length] },
  );

  return (
    <div
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden bg-[linear-gradient(180deg,#f7f7fd,#ece8fb)] text-ink"
    >
      <div className="absolute inset-x-0 top-[12vh] z-0 text-center">
        <p className="mb-2 text-sm font-bold uppercase tracking-[2px] text-p2">
          Certifications
        </p>
        <h2 className="text-[clamp(34px,6vw,64px)] font-extrabold leading-none">Credentials</h2>
        <p className="mt-3 text-xs text-muted">↓ Scroll</p>
      </div>

      {certs.map((c) => (
        <article
          key={c.title}
          className="cert-card absolute left-1/2 top-[62%] h-[300px] w-[220px] overflow-hidden rounded-2xl text-white shadow-[0_24px_60px_rgba(79,70,229,.25)] sm:h-[360px] sm:w-[270px]"
          style={{ background: `linear-gradient(145deg, ${c.from}, ${c.to})` }}
        >
          <span
            aria-hidden
            className="absolute -right-3 top-10 select-none text-7xl font-black uppercase leading-none text-white/15 [writing-mode:vertical-rl] sm:text-8xl"
          >
            {c.issuer.split(" ")[0]}
          </span>
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <Badge className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {c.tag}
          </Badge>
          <div className="absolute inset-x-5 bottom-5">
            <p className="mb-1 text-xs font-medium text-white/70">{c.issuer}</p>
            <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">{c.title}</h3>
          </div>
        </article>
      ))}
    </div>
  );
}
