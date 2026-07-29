import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { MobileNavigationMenuProps } from "../types";
import { mobileButtons, navigation } from "../data";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { NavbarMobileMenuItem } from "./navbar-mobile-menu-item";

export function NavbarMobileNavigationMenu({
  open,
}: MobileNavigationMenuProps) {
  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-998 h-dvh w-full bg-background pt-[3.9375rem] [&>button]:hidden"
      >
        <div className="h-full overflow-y-auto pt-10 pb-20">
          <div className="container">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {mobileButtons.map((btn, index) => (
                  <Button
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
              <Accordion type="multiple" className="w-full">
                {navigation.map((item, index) => (
                  <NavbarMobileMenuItem
                    item={item}
                    key={`navbar-mobile-menu-item-${index}`}
                  />
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
