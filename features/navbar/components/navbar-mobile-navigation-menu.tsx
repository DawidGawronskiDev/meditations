"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { navigation } from "../data";
import { MobileMenuProps } from "../types";

export function NavbarMobileNavigationMenu({
  open,
  onOpenChange,
}: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        showCloseButton={false}
        aria-describedby={undefined}
        className="top-16 border-t-0"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="container mx-auto flex flex-col gap-1 px-4 py-2">
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              onClick={() => onOpenChange(false)}
              className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
