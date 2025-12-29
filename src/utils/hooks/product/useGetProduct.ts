import { useEffect, useState } from "react";
import { productService } from "@/utils/services/product.service";
import { Product } from "@/types/product";

export const useGetProduct = (id?: string) => {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const seen = async () => {
      try {
        const res = await productService.getById(id);
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    seen();
  }, [id]);

  return { data, loading };
};
