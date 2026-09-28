import CarouselStacked, { type Slide } from "@/components/ui/carousel-07";
import { projects } from "@/data/site";

const slides: Slide[] = projects.map((p) => ({
  image: p.image,
  title: p.title.split(" — ")[0],
  description: p.desc,
  badge: p.tag,
  href: p.link,
}));

export default function ProjectsCarousel() {
  return (
    <div className="w-full">
      <CarouselStacked slides={slides} />
      <p className="text-center text-sm text-muted">Drag to browse my projects</p>
    </div>
  );
}
