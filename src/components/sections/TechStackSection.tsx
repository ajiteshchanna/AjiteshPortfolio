"use client";

import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { TECH_STACK_ITEMS, type TechStackItem } from "@/data/techStack";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./TechStackSection.module.css";

type ViewMode = "desktop" | "tablet" | "mobile";

type ModeConfig = {
  angleStep: number;
  radiusX: number;
  radiusY: number;
  baseY: number;
  visibleRange: number;
  lift: number;
  maxBlur: number;
};

type SceneItem = {
  index: number;
  item: TechStackItem;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  blur: number;
  depthZ: number;
  rotateY: number;
  layer: number;
};

const MODE_CONFIGS: Record<ViewMode, ModeConfig> = {
  desktop: {
    angleStep: 0.43,
    radiusX: 39,
    radiusY: 18,
    baseY: 62,
    visibleRange: 4,
    lift: 5,
    maxBlur: 5.2,
  },
  tablet: {
    angleStep: 0.52,
    radiusX: 33,
    radiusY: 15,
    baseY: 61,
    visibleRange: 3,
    lift: 4.2,
    maxBlur: 4.6,
  },
  mobile: {
    angleStep: 0.68,
    radiusX: 25,
    radiusY: 12,
    baseY: 58,
    visibleRange: 2,
    lift: 3.5,
    maxBlur: 4,
  },
};

const INTERACTION_COOLDOWN_MS = 680;
const WHEEL_THRESHOLD = 18;
const SWIPE_THRESHOLD = 52;

const round = (value: number): number => Number(value.toFixed(3));

function clampIndex(value: number): number {
  return Math.max(0, Math.min(TECH_STACK_ITEMS.length - 1, value));
}

function getVisibilityRatio(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

  if (visibleHeight <= 0) {
    return 0;
  }

  return visibleHeight / Math.min(rect.height, viewportHeight);
}

function getArcPath(mode: ViewMode, inset = 0): string {
  const config = MODE_CONFIGS[mode];
  const startX = round(50 - (config.radiusX - inset));
  const endX = round(50 + (config.radiusX - inset));
  const baseY = round(config.baseY + inset * 0.28);
  const peakY = round(config.baseY - config.radiusY * 1.92 + inset * 0.72);

  return `M ${startX} ${baseY} Q 50 ${peakY} ${endX} ${baseY}`;
}

function buildSceneItems(activeIndex: number, mode: ViewMode): SceneItem[] {
  const config = MODE_CONFIGS[mode];
  const start = Math.max(0, activeIndex - config.visibleRange);
  const end = Math.min(TECH_STACK_ITEMS.length - 1, activeIndex + config.visibleRange);

  return TECH_STACK_ITEMS.slice(start, end + 1).map((item, localIndex) => {
    const index = start + localIndex;
    const offset = index - activeIndex;
    const distance = Math.abs(offset);
    const depth = Math.max(0, 1 - distance / (config.visibleRange + 1));
    const angle = offset * config.angleStep;

    return {
      index,
      item,
      x: round(50 + Math.sin(angle) * config.radiusX),
      y: round(config.baseY - (1 - Math.cos(angle)) * config.radiusY - depth * config.lift),
      scale: round(0.56 + depth * 0.56),
      opacity: round(0.2 + depth * 0.8),
      blur: round((1 - depth) * config.maxBlur),
      depthZ: round(-120 + depth * 210),
      rotateY: round(offset * -8),
      layer: 10 + Math.round(depth * 30) - distance,
    };
  });
}

type CarouselSceneProps = {
  activeIndex: number;
  mode: ViewMode;
  onSelect: (index: number) => void;
};

function CarouselScene({ activeIndex, mode, onSelect }: CarouselSceneProps) {
  const sceneItems = useMemo(() => buildSceneItems(activeIndex, mode), [activeIndex, mode]);

  return (
    <div className={`${styles.scene} ${styles[`scene${mode[0].toUpperCase()}${mode.slice(1)}`]}`}>
      <svg viewBox="0 0 100 70" className={styles.arcSvg} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`tech-track-${mode}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(223, 37, 49, 0)" />
            <stop offset="18%" stopColor="rgba(223, 37, 49, 0.18)" />
            <stop offset="50%" stopColor="rgba(223, 37, 49, 0.42)" />
            <stop offset="82%" stopColor="rgba(223, 37, 49, 0.18)" />
            <stop offset="100%" stopColor="rgba(223, 37, 49, 0)" />
          </linearGradient>
        </defs>
        <path d={getArcPath(mode)} className={styles.track} stroke={`url(#tech-track-${mode})`} />
        <path d={getArcPath(mode, 4)} className={styles.trackInner} />
      </svg>

      {sceneItems.map((sceneItem) => {
        const isActive = sceneItem.index === activeIndex;
        const style = {
          left: `${sceneItem.x}%`,
          top: `${sceneItem.y}%`,
          zIndex: sceneItem.layer,
          ["--item-scale" as string]: String(sceneItem.scale),
          ["--item-opacity" as string]: String(sceneItem.opacity),
          ["--item-blur" as string]: `${sceneItem.blur}px`,
          ["--item-depth" as string]: `${sceneItem.depthZ}px`,
          ["--item-rotate-y" as string]: `${sceneItem.rotateY}deg`,
        } satisfies CSSProperties & Record<string, string | number>;

        return (
          <button
            key={`${mode}-${sceneItem.item.name}`}
            type="button"
            className={`${styles.techItem} ${isActive ? styles.techItemActive : ""}`}
            style={style}
            onClick={() => onSelect(sceneItem.index)}
            aria-label={`Select ${sceneItem.item.name}`}
            aria-pressed={isActive}
          >
            <span className={styles.techItemSurface}>
              <span className={styles.techItemName}>{sceneItem.item.name}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function TechStackSection() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const lastInteractionAtRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = TECH_STACK_ITEMS[activeIndex];
  const canGoPrevious = activeIndex > 0;
  const canGoNext = activeIndex < TECH_STACK_ITEMS.length - 1;

  const sceneMotionClass = reducedMotion ? "" : styles.sceneMotion;

  const selectIndex = (index: number) => {
    setActiveIndex(clampIndex(index));
    lastInteractionAtRef.current = Date.now();
  };

  const moveBy = (delta: number) => {
    setActiveIndex((current) => clampIndex(current + delta));
    lastInteractionAtRef.current = Date.now();
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!sectionRef.current || Math.abs(event.deltaY) < WHEEL_THRESHOLD) {
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const hasDestination = direction > 0 ? canGoNext : canGoPrevious;
    const isFocusedEnough = getVisibilityRatio(sectionRef.current) >= 0.45;

    if (!isFocusedEnough) {
      return;
    }

    const now = Date.now();

    if (now - lastInteractionAtRef.current < INTERACTION_COOLDOWN_MS) {
      if (hasDestination) {
        event.preventDefault();
      }

      return;
    }

    if (!hasDestination) {
      return;
    }

    event.preventDefault();
    moveBy(direction);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" && canGoPrevious) {
      event.preventDefault();
      moveBy(-1);
    }

    if (event.key === "ArrowRight" && canGoNext) {
      event.preventDefault();
      moveBy(1);
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) {
      return;
    }

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;

    touchStartRef.current = null;
    touchEndRef.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
      return;
    }

    if (deltaX < 0 && canGoNext) {
      moveBy(1);
    }

    if (deltaX > 0 && canGoPrevious) {
      moveBy(-1);
    }
  };

  return (
    <section ref={sectionRef} className={`section-gap tech-stack ${styles.techStack}`} aria-labelledby="tech-stack-heading">
      <div className="container-page">
        <header className={styles.header}>
          <p className={styles.label}>TECH STACK</p>
          <h2 id="tech-stack-heading" className={styles.title}>TOOLS I BUILD WITH</h2>
          <p className={styles.subtitle}>
            Technologies I use to turn ideas into intelligent systems, products, and experiences.
          </p>
        </header>

        <div className={styles.shell}>
          <div
            className={`${styles.viewport} ${sceneMotionClass}`}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Technology stack carousel"
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div className={styles.ambientGlow} aria-hidden="true" />

            <CarouselScene activeIndex={activeIndex} mode="desktop" onSelect={selectIndex} />
            <CarouselScene activeIndex={activeIndex} mode="tablet" onSelect={selectIndex} />
            <CarouselScene activeIndex={activeIndex} mode="mobile" onSelect={selectIndex} />

            <div className={styles.controls}>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => moveBy(-1)}
                disabled={!canGoPrevious}
                aria-label="Previous technology"
              >
                <span aria-hidden="true">&#8592;</span>
              </button>
              <button
                type="button"
                className={styles.controlButton}
                onClick={() => moveBy(1)}
                disabled={!canGoNext}
                aria-label="Next technology"
              >
                <span aria-hidden="true">&#8594;</span>
              </button>
            </div>

            <div className={styles.activePanel} aria-live="polite">
              <span className={styles.activeCategory}>{activeItem.category}</span>
              <h3 className={styles.activeName}>{activeItem.name}</h3>
              <p className={styles.activeDescription}>{activeItem.description}</p>
              <p className={styles.activeCounter}>
                <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className={styles.counterDivider} />
                <span>{String(TECH_STACK_ITEMS.length).padStart(2, "0")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}