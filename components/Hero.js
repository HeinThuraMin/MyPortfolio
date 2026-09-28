import Image from "next/image";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import Socials from "@/components/Socials";
import { profile } from "@/data/site";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pb-14 pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[2vw] top-1/2 -translate-y-[38%] select-none text-[clamp(160px,28vw,420px)] font-extrabold leading-none tracking-[-0.04em] text-[#eef0f6]"
      >
        HEIN
      </div>
      <span aria-hidden className="float absolute left-[43%] top-[18%] h-[26px] w-[26px] rounded-full bg-[#c9b4fb]" />
      <span aria-hidden className="float absolute right-[6%] top-[36%] h-[18px] w-[18px] rounded-full border-[3px] border-[#f6d8a8]" />

      <div className="relative mx-auto grid w-[min(1140px,100%-40px)] items-center gap-8 md:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="flex items-center gap-4 text-2xl font-semibold uppercase md:text-4xl">
            Hello <i className="block h-0.5 w-24 bg-ink md:w-56" />
          </p>
          <TextBlockAnimation delay={0.2}>
            <h1 className="my-2.5 text-[clamp(30px,4.6vw,64px)] font-extrabold uppercase leading-[1.05]">
              <span className="block">I am</span>
              <span className="block whitespace-nowrap">{profile.name}</span>
            </h1>
          </TextBlockAnimation>
          <TextBlockAnimation delay={0.6}>
            <p className="text-lg font-semibold uppercase tracking-wide text-p1 md:text-2xl">{profile.role}</p>
          </TextBlockAnimation>
          <TextBlockAnimation delay={0.8} blockColor="#4f46e5">
            <p className="mb-8 mt-4 max-w-[520px] text-muted">{profile.intro}</p>
          </TextBlockAnimation>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="grad rounded px-9 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(79,70,229,.35)] transition hover:-translate-y-1">
              Hire me
            </a>
            <a href="/Hein_Thura_Min_Resume.pdf" download className="rounded border-2 border-p1 px-9 py-4 text-sm font-bold uppercase tracking-wide transition hover:-translate-y-1 hover:bg-p1 hover:text-white">
              Get CV
            </a>
          </div>
          <Socials />
        </div>

        <div className="relative order-first mx-auto flex w-full max-w-[340px] justify-center md:order-none md:max-w-[440px]">
          <div className="morph absolute inset-[4%_-6%_2%_-6%] rounded-[58%_42%_60%_40%/45%_55%_45%_55%] bg-[#ece9ff]" />
          <Image
            src="/hero.png"
            alt="Line illustration of a person sitting at a desk with a coffee and phone"
            width={736}
            height={981}
            priority
            className="float relative h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
