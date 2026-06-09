export type Category =
  | "Free Food"
  | "Tenant Defense"
  | "Public Space"
  | "Repair Skills"
  | "Local Makers"
  | "Gathering Places"
  | "Mutual Aid"
  | "Co-op Leads";

export interface Listing {
  id: string;
  name: string;
  category: Category;
  address: string;
  hours: string;
  description: string;
  contact?: string;
  lat: number;
  lng: number;
  tags?: string[];
}

export const CATEGORY_COLORS: Record<Category, string> = {
  "Free Food": "#5BAEC9",
  "Tenant Defense": "#FF6B6B",
  "Public Space": "#1A6B8A",
  "Repair Skills": "#FFA07A",
  "Local Makers": "#0A3D5C",
  "Gathering Places": "#7AB8D0",
  "Mutual Aid": "#3D8FAD",
  "Co-op Leads": "#D4A843",
};

export const CATEGORY_BG: Record<Category, string> = {
  "Free Food": "bg-orange-100 text-orange-800",
  "Tenant Defense": "bg-red-100 text-red-800",
  "Public Space": "bg-blue-100 text-blue-800",
  "Repair Skills": "bg-yellow-100 text-yellow-800",
  "Local Makers": "bg-green-100 text-green-800",
  "Gathering Places": "bg-purple-100 text-purple-800",
  "Mutual Aid": "bg-teal-100 text-teal-800",
  "Co-op Leads": "bg-indigo-100 text-indigo-800",
};
