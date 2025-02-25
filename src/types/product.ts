export type Product = {
  title: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  review?: number;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
