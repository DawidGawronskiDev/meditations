import chakrasData from "@/data/chakras.json";

export type Chakra = {
  slug: string;
  name: string;
  sanskrit: string;
  location: string;
  color: string;
  element: string;
};

export const chakras: Chakra[] = chakrasData;
