export type MenuItem = {
  title: string;
  url: string;
};

export type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
