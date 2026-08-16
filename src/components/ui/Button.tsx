"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { iconNudge } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  download?: string | boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-accent text-white font-semibold",
    "hover:bg-accent-hover hover:shadow-[0_0_24px_rgba(223,37,49,0.20)]",
    "active:bg-accent-press active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none",
  ].join(" "),

  secondary: [
    "bg-surface border border-border text-fg",
    "hover:border-accent/40 hover:bg-surface-raised",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),

  ghost: [
    "text-fg-muted hover:text-fg hover:bg-surface",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),

  outline: [
    "border border-accent/40 text-accent",
    "hover:bg-accent/10 hover:border-accent",
    "active:scale-[0.98]",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-7 text-sm rounded-xl gap-2.5",
};

const base =
  "inline-flex min-w-0 max-w-full items-center justify-center font-medium tracking-wide transition-all duration-200 select-none text-center cursor-pointer";

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  type = "button",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  onClick,
  "aria-label": ariaLabel,
  download,
}: ButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  const inner = (
    <>
      {loading ? (
        <Spinner />
      ) : leftIcon ? (
        <motion.span
          variants={prefersReducedMotion ? undefined : iconNudge}
          initial={prefersReducedMotion ? undefined : "rest"}
          whileHover={prefersReducedMotion ? undefined : "hover"}
          className="inline-flex"
        >
          {leftIcon}
        </motion.span>
      ) : null}
      <span>{children}</span>
      {!loading && rightIcon ? (
        <motion.span
          variants={prefersReducedMotion ? undefined : iconNudge}
          initial={prefersReducedMotion ? undefined : "rest"}
          whileHover={prefersReducedMotion ? undefined : "hover"}
          className="inline-flex"
        >
          {rightIcon}
        </motion.span>
      ) : null}
    </>
  );

  if (href !== undefined) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
          aria-label={ariaLabel}
          download={download}
          whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.01 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <motion.div whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.01 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}>
        <Link href={href} className={classes} onClick={onClick} aria-label={ariaLabel}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={loading || disabled}
      aria-label={ariaLabel}
      aria-disabled={loading || disabled}
      whileHover={prefersReducedMotion || loading || disabled ? undefined : { y: -1, scale: 1.01 }}
      whileTap={prefersReducedMotion || loading || disabled ? undefined : { scale: 0.985 }}
    >
      {inner}
    </motion.button>
  );
}
