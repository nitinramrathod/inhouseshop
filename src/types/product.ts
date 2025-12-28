export type Product = {
  title: string;
  name?: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  review?: number;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  images?: string[];
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
