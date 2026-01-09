
export interface LaptopSpecs {
  display: string; // e.g., "15.6 inch Full HD"
  graphics: "Intel Iris Xe" | string; // allow exact known value or other strings
  os: "Windows 11 Home" | "Windows 11 Pro" | string;
  processor: string; // e.g., "Intel Core i5 12th Gen"
  ram: string; // e.g., "16GB DDR4"
  storage: string; // e.g., "512GB SSD"
}


export type Product = {
  title: string;
  _id?: string;
  name?: string;
  description?: string;
  inStock?: boolean;
  rating?: number;
  review?: number;
  reviews: number;
  price: number;
  specifications?: LaptopSpecs;
  discountedPrice: number;
  discountPrice?: number;
  averageRating?: number;
  reviewCount?: number;
  sku?: string;
  stock?: number;  
  id: number;
  images?: string[];
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
