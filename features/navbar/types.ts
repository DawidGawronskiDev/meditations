import type { LucideIcon } from "lucide-react";

export type MenuLink = {
  label: string;
  description?: string;
  url: string;
  icon: LucideIcon;
};

export type MenuItem = {
  title: string;
  url?: string;
};

export type DesktopMenuItemProps = {
  item: MenuItem;
  index: number;
};

export type MobileNavigationMenuProps = {
  open: boolean;
};
