import type { CSSProperties } from "react";
import { HERO_CODE_FRAGMENTS } from "@/data/heroCode";

type FragmentStyle = CSSProperties & Record<string, string | number>;

export function HeroCodeBackdrop() {
  return (
    <div className="hero-code-layer" aria-hidden="true">
      {HERO_CODE_FRAGMENTS.map((fragment, index) => {
        const style: FragmentStyle = {
          ["--code-x" as string]: `${fragment.x}%`,
          ["--code-y" as string]: `${fragment.y}%`,
          ["--code-size-desktop" as string]: fragment.sizeDesktop,
          ["--code-size-mobile" as string]: fragment.sizeMobile,
          ["--code-duration" as string]: `${fragment.duration}s`,
          ["--code-delay" as string]: `${fragment.delay}s`,
          ["--code-drift-x" as string]: `${fragment.driftX}px`,
          ["--code-drift-y" as string]: `${fragment.driftY}px`,
          ["--code-rotate" as string]: `${fragment.rotate}deg`,
          ["--code-blur" as string]: `${fragment.blur}px`,
        };

        return (
          <span
            key={`${fragment.type}-${index}-${fragment.text}`}
            style={style}
            className={[
              "hero-code-fragment",
              `hero-code-${fragment.type}`,
              `hero-code-depth-${fragment.depth}`,
              fragment.tone === "crimson" ? "hero-code-crimson" : "hero-code-light",
              fragment.hideOnTablet ? "hero-code-hide-tablet" : "",
              fragment.hideOnMobile ? "hero-code-hide-mobile" : "",
            ].join(" ").trim()}
          >
            {fragment.text}
          </span>
        );
      })}
    </div>
  );
}
