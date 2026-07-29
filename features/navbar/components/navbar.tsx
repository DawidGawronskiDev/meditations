"use client";
import { MenuIcon, X } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";
import { cn } from "@/lib/utils";
import { desktopButtons, mobileBreakpoint, navigation } from "../data";
import { NavbarDesktopMenuItem } from "./navbar-desktop-menu-item";
import { NavbarMobileNavigationMenu } from "./navbar-mobile-navigation-menu";

type NavbarProps = React.ComponentProps<"header">;

export const Navbar = ({ className, ...props }: NavbarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > mobileBreakpoint) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
  };

  return (
    <Fragment>
      <section
        className={cn(
          "pointer-events-auto sticky top-0 z-999 flex h-16 w-full items-center justify-center bg-background",
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <NavigationMenu className="hidden xl:flex" viewport={false}>
                <NavigationMenuList>
                  {navigation.map((item, index) => (
                    <NavbarDesktopMenuItem
                      key={`desktop-link-${index}`}
                      item={item}
                      index={index}
                    />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="hidden items-center gap-3 xl:flex">
              <ThemeToggle />
              {desktopButtons.map((btn, index) => (
                <Button
                  size="sm"
                  variant={!btn.isPrimary ? "outline" : "default"}
                  className={
                    btn.isPrimary
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }
                  asChild
                  key={`navbar-btn-${index}`}
                >
                  <a href={btn.url}>{btn.label}</a>
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-1 xl:hidden">
              <ThemeToggle />
              <Button
                className="size-11"
                variant="ghost"
                onClick={handleMobileMenu}
              >
                {open ? (
                  <X className="size-5.5 stroke-foreground" />
                ) : (
                  <MenuIcon className="size-5.5 stroke-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <NavbarMobileNavigationMenu open={open} />
    </Fragment>
  );
};
