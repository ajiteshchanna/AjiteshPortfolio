import { MARQUEE_ITEMS } from "@/data/marquee";

const MARQUEE_TEXT = MARQUEE_ITEMS.join(" | ");

export function MarqueeBar() {
  return (
    <div className="marquee-shell h-5 border-t border-border/35 bg-black/45 sm:h-6" aria-label="Highlights marquee">
      <div className="marquee-track text-[10px] font-medium tracking-[0.08em] uppercase text-white/90 sm:text-[11px] sm:tracking-[0.09em]">
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
