import { MARQUEE_ITEMS } from "@/data/marquee";

const MARQUEE_TEXT = MARQUEE_ITEMS.join(" | ");

export function MarqueeBar() {
  return (
    <div className="marquee-shell h-6 border-t border-border/35 bg-black/45" aria-label="Highlights marquee">
      <div className="marquee-track text-[11px] font-medium tracking-[0.09em] uppercase text-white/90">
        <span className="marquee-line">
          <span className="marquee-star" aria-hidden="true">★</span>
          <span>{MARQUEE_TEXT}</span>
          <span className="marquee-star" aria-hidden="true">★</span>
        </span>
        <span className="marquee-line" aria-hidden="true">
          <span className="marquee-star">★</span>
          <span>{MARQUEE_TEXT}</span>
          <span className="marquee-star">★</span>
        </span>
      </div>
    </div>
  );
}
