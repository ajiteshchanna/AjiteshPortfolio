export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About",      href: "/about"      },
  { label: "Projects",   href: "/projects"   },
  { label: "Experience", href: "/experience" },
  { label: "Research",   href: "/research"   },
  { label: "Contact",    href: "/contact"    },
];
