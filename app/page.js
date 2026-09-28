import Navbar from "@/components/Navbar";
import ScrollArrow from "@/components/ui/scroll-arrow";
import Hero from "@/components/Hero";
import { About, Experience, Projects, Skills, Certifications, Contact } from "@/components/Sections";
import { profile } from "@/data/site";

export default function Home() {
  return (
    <>
      <ScrollArrow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <footer className="flex flex-col items-center gap-5 py-10 text-center text-sm text-muted">
        <a
          href="#home"
          className="grad rounded px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(79,70,229,.35)] transition hover:-translate-y-1"
        >
          ↑ Get to top
        </a>
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
      </footer>
    </>
  );
}
