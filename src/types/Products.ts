export type Product = {
  id: number;
  name: string;
  description?: string;
  category: string;
  brand: string;
  slug?: string;
  images: string;
  price: number;
  discount: number;
  count: number;
  rating?: number;
  review?: number;
};
