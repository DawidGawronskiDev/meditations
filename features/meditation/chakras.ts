export type Chakra = {
  slug: string;
  name: string;
  sanskrit: string;
  location: string;
  color: string;
  element: string;
};

export const chakras: Chakra[] = [
  {
    slug: "muladhara",
    name: "Root",
    sanskrit: "Muladhara",
    location: "Base of spine",
    color: "#E73F1E",
    element: "Earth",
  },
  {
    slug: "swadhisthana",
    name: "Sacral",
    sanskrit: "Swadhisthana",
    location: "Lower abdomen",
    color: "#FB6C00",
    element: "Water",
  },
  {
    slug: "manipura",
    name: "Solar Plexus",
    sanskrit: "Manipura",
    location: "Upper abdomen",
    color: "#FFD400",
    element: "Fire",
  },
  {
    slug: "anahata",
    name: "Heart",
    sanskrit: "Anahata",
    location: "Center of chest",
    color: "#2EC4B6",
    element: "Air",
  },
  {
    slug: "vishuddha",
    name: "Throat",
    sanskrit: "Vishuddha",
    location: "Throat",
    color: "#1E90C7",
    element: "Ether",
  },
  {
    slug: "ajna",
    name: "Third Eye",
    sanskrit: "Ajna",
    location: "Between the eyebrows",
    color: "#5B3FA0",
    element: "Light",
  },
  {
    slug: "sahasrara",
    name: "Crown",
    sanskrit: "Sahasrara",
    location: "Top of head",
    color: "#8A6CFB",
    element: "Thought/Consciousness",
  },
];
