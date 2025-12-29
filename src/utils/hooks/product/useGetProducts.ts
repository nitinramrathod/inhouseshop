import { useEffect, useState } from "react";
import {productService, ProductSearchParams } from "@/utils/services/product.service";
import { Product } from "@/types/product";

export const useGetProducts = (params?: ProductSearchParams) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll(params);
      setData(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchProducts };
};
