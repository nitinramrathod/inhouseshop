import { useState } from "react";
import { productService } from "@/utils/services/product.service";

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);

  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await productService.remove(id);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading };
};
