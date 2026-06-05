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
  "Free Food": "#E07B39",
  "Tenant Defense": "#C0392B",
  "Public Space": "#2980B9",
  "Repair Skills": "#D4AC0D",
  "Local Makers": "#27AE60",
  "Gathering Places": "#8E44AD",
  "Mutual Aid": "#16A085",
  "Co-op Leads": "#2C3E82",
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
