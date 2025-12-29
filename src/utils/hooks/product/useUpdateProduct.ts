import { useState } from "react";
import { productService } from "@/utils/services/product.service";

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);

  const updateProduct = async (id: string, payload: any) => {
    setLoading(true);
    try {
      const res = await productService.update(id, payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading };
};
