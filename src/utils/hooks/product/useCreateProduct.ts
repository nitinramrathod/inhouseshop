import { useState } from "react";
import { productService } from "@/utils/services/product.service";

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (payload: any) => {
    try {
      setLoading(true);
      setError(null);
      const res = await productService.create(payload);
      return res.data;
    } catch (err: any) {
      setError(err.message || "Create failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
};
