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
  "Free Food": "#7A9E7E",
  "Tenant Defense": "#C65A1E",
  "Public Space": "#2F6F73",
  "Repair Skills": "#E3A24C",
  "Local Makers": "#2F5D50",
  "Gathering Places": "#8B9D8A",
  "Mutual Aid": "#5B8C7A",
  "Co-op Leads": "#C2A04A",
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
