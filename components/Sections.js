import Reveal from "./Reveal";
import ProjectsCarousel from "./ProjectsCarousel";
import CertGallery from "@/components/ui/cert-gallery";
import Marquee from "@/components/ui/marquee";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { profile, stats, experience, skills, certs } from "@/data/site";

const wrap = "mx-auto w-[min(1140px,100%-40px)]";

function Heading({ eyebrow, title, light, mono }) {
  return (
    <div className="mb-14 text-center">
      <p className={`mb-2 text-sm font-bold uppercase tracking-[2px] ${light ? "text-[#dcd3ff]" : mono ? "text-neutral-500" : "text-p2"}`}>{eyebrow}</p>
      <TextBlockAnimation blockColor={light ? "#ffffff" : mono ? "#0d0d1a" : "#7c4dff"}>
        <h2 className={`text-[clamp(28px,4vw,46px)] font-extrabold leading-tight ${light ? "text-white" : ""}`}>{title}</h2>
      </TextBlockAnimation>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <Reveal className={`${wrap} grid gap-12 md:grid-cols-[1fr_1.2fr]`}>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[2px] text-p2">About me</p>
          <h2 className="text-[clamp(28px,4vw,46px)] font-extrabold leading-tight">
            Building useful things with data, code and AI
          </h2>
        </div>
        <div>
          {profile.about.map((p) => (
            <p key={p} className="mb-4 text-muted">{p}</p>
          ))}
          <div className="mt-8 flex flex-wrap gap-10">
            {stats.map(([n, l]) => (
              <div key={l}>
                <b className="grad-text block text-5xl font-extrabold leading-tight">{n}</b>
                <span className="text-xs font-semibold uppercase tracking-wide">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className={wrap}>
        <Heading eyebrow="Journey" title="Experience & Education" />
        <div className="mx-auto max-w-[820px] border-l-[3px] border-line pl-9">
          {experience.map((e) => (
            <Reveal key={e.title} offset="-15%" className="relative pb-11">
              <span className="absolute -left-[46px] top-1.5 h-4 w-4 rounded-full border-4 border-p2 bg-white" />
              <span className="grad mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-semibold text-white">{e.date}</span>
              <h3 className="text-xl font-semibold">{e.title}</h3>
              <em className="text-[15px] not-italic text-p1">{e.org}</em>
              {e.points && (
                <ul className="mt-3 space-y-1.5">
                  {e.points.map((p) => (
                    <li key={p} className="relative pl-5 text-[15px] text-muted before:absolute before:left-0 before:top-[11px] before:h-0.5 before:w-2 before:bg-p2">{p}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="bg-soft py-20 md:py-28">
      <div className={wrap}>
        <Heading eyebrow="My work" title="Featured Projects" />
        <ProjectsCarousel />
      </div>
    </section>
  );
}

// spread every skill across three marquee rows
const skillRows = [[], [], []];
skills.flatMap(([, items]) => items).forEach((s, i) => skillRows[i % 3].push(s));

export function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f5f7,#e4e4e9)] py-20 md:py-28"
    >
      {/* neutral blurred shapes so the glass chips have something to blur */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-neutral-400/50 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-neutral-500/40 blur-3xl" />
      </div>
      <div className="relative">
        <div className={wrap}>
          <Heading mono eyebrow="Toolbox" title="Skills" />
        </div>
        <div className="space-y-5">
          {skillRows.map((row, i) => (
            <Marquee key={i} reverse={i % 2 === 1} duration={34 + i * 6}>
              {row.map((s) => (
                <span
                  key={s}
                  className="whitespace-nowrap rounded-full border border-white/70 bg-white/40 px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_32px_rgba(0,0,0,.08),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-xl transition hover:bg-white/70"
                >
                  {s}
                </span>
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section id="certifications">
      <CertGallery certs={certs} />
    </section>
  );
}

export function Contact() {
  const links = [
    [profile.email, `mailto:${profile.email}`],
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
  ];
  return (
    <section id="contact" className="grad py-20 text-white md:py-28">
      <Reveal className={wrap}>
        <Heading light eyebrow="Get in touch" title="Let's work together" />
        <p className="mx-auto -mt-8 mb-10 max-w-[560px] text-center text-[#e7e2ff]">
          Open to data engineering, full-stack and AI opportunities. Reach out any time.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {links.map(([label, href]) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="rounded border-2 border-white/60 px-7 py-3.5 font-semibold transition hover:-translate-y-1 hover:bg-white hover:text-p1">
              {label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
