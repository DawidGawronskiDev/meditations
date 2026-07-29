import { MenuItem } from "./types";

export const navigation: MenuItem[] = [
  {
    title: "Meditations",
    url: "/meditations",
  },
];

export const desktopButtons = [
  {
    label: "Contact",
    isPrimary: false,
    url: "#",
  },
];

export const mobileButtons = [
  {
    label: "Sign up",
    isPrimary: true,
    url: "#",
  },
  {
    label: "Log in",
    isPrimary: false,
    url: "#",
  },
];

export const mobileBreakpoint = 1024;
