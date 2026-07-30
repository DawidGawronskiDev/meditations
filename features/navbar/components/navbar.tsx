"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";
import { cn } from "@/lib/utils";
import { mobileBreakpoint, navigation } from "../data";
import { NavbarMobileNavigationMenu } from "./navbar-mobile-navigation-menu";

type NavbarProps = React.ComponentProps<"header">;

export const Navbar = ({ className, ...props }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= mobileBreakpoint) setOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-999 flex h-16 w-full items-center bg-background",
        className,
      )}
      {...props}
    >
      <div className="relative container mx-auto flex items-center px-4">
        <div className="hidden w-full md:flex">
          <DesktopNavbar />
        </div>
        <div className="flex w-full md:hidden">
          <MobileNavbar open={open} onOpenChange={setOpen} />
        </div>
      </div>
      <NavbarMobileNavigationMenu open={open} onOpenChange={setOpen} />
    </header>
  );
};

type DekstopNavbarProps = React.ComponentProps<"div">;

export function DesktopNavbar({ className, ...props }: DekstopNavbarProps) {
  return (
    <div className="flex items-center justify-between w-full" {...props}>
      <div className="flex-1 flex justify-start">
        <nav>
          <ul className="flex gap-4">
            {navigation.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.url}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 flex justify-center">
        <Link href="/">Meditation Orbits</Link>
      </div>
      <div className="flex-1 flex justify-end">
        <ThemeToggle />
      </div>
    </div>
  );
}

type MobileNavbarProps = React.ComponentProps<"div"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNavbar({
  open,
  onOpenChange,
  className,
  ...props
}: MobileNavbarProps) {
  return (
    <div
      className={cn("relative flex w-full items-center", className)}
      {...props}
    >
      <Link href="/">
        <span className="font-light tracking-tight">Meditation Orbits</span>
      </Link>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        <Button
          className="size-11"
          variant="ghost"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => onOpenChange(!open)}
        >
          {open ? (
            <X className="size-5.5 stroke-foreground" />
          ) : (
            <MenuIcon className="size-5.5 stroke-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
