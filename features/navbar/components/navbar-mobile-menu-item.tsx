import Link from "next/link";
import { MenuItem } from "../types";

type NavbarMobileMenuItemProps = Omit<
  React.ComponentProps<typeof Link>,
  "href"
> & {
  item: MenuItem;
};

export function NavbarMobileMenuItem({
  item,
  ...props
}: NavbarMobileMenuItemProps) {
  return (
    <Link
      key={item.title}
      href={item.url ?? "#"}
      className="flex h-[3.75rem] items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
      {...props}
    >
      {item.title}
    </Link>
  );
}
