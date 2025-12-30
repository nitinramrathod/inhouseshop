"use client"

import React, { useEffect, useState } from "react";
// import { Metadata } from "next";
import Button from "@/components/dashboard/forms/Button";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/utils/hooks/product";
import DataTable from "@/components/dashboard/table/DataTable";
import { LaptopSpecs } from "@/types/product";
import { Pencil, Plus, Trash } from "lucide-react";
// export const metadata: Metadata = {
//   title: "Products List | In House Shop",
//   description: "Products list page.",
//   // other metadata
// };

const backendURL = 'http://localhost:3001'

export interface Product {
    id: number;
    name: string;
    _id: string;
    description: string;
    price: string;
    discount_price: string;
    image: string; // Assuming image URL is returned
}

type SpecsCellProps = {
    specs: LaptopSpecs;
};

export const SpecsCell = ({ specs }: SpecsCellProps) => {
    return (
        <div className="px-4 py-3 flex items-start">
            <div className="space-y-1 text-sm text-slate-700 grid grid-cols-2 gap-2">
                <p>
                    <span className="font-medium">Processor:</span>{" "}
                    {specs.processor}
                </p>
                <p>
                    <span className="font-medium">RAM:</span> {specs.ram}
                </p>
                <p>
                    <span className="font-medium">Storage:</span>{" "}
                    {specs.storage}
                </p>
                <p>
                    <span className="font-medium">Display:</span>{" "}
                    {specs.display}
                </p>
                <p>
                    <span className="font-medium">Graphics:</span>{" "}
                    {specs.graphics}
                </p>
                <p>
                    <span className="font-medium">OS:</span> {specs.os}
                </p>
            </div>
        </div>
    );
};

type NameDescriptionCellProps = {
    name: string;
    description?: string;
};

export const NameDescriptionCell = ({
    name,
    description,
}: NameDescriptionCellProps) => {
    return (
        <div className="px-4 py-3 flex items-start">
            <div className="max-w-[320px]">
                {/* Name */}
                <p className="font-semibold text-slate-900 leading-tight">
                    {name}
                </p>

                {/* Description */}
                {description && (
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};


const BlogGridPage = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const { data } = useGetProducts();

    console.log("data===>", data);

    const fetchData = async () => {
        const res = await fetch(`${backendURL}/products`, {
            method: "GET",
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
                // Add any other necessary headers here (e.g., authentication tokens)
            },
        });

        // If the response is not successful, handle the error
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        // Parse the JSON response into product data
        const products: Product[] = await res.json();
        setProducts(products)
    }

    const goToCreate = () => {
        router.push('/admin/products/create')
    }
    const goToEdit = (id) => {
        router.push(`/admin/products/${id}`)
    }

    const handleDelete = async (id) => {
        const res = await fetch(`${backendURL}/products/${id}`, {
            method: "Delete"
        });

        if (!res.ok) {
            throw new Error("Failed to delete product");
        } else {
            fetchData()

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const HEADERS = ['Name', 'Specifications', 'Price', 'SKU', 'Stock ']


    return (
        <main>



            <div className="mx-auto max-w-[1200px] px-4">

                <div className="flex justify-between my-4">

                    <h1 className="text-[2rem] leading-[2rem]">Product List</h1>

                    <button onClick={goToCreate} className="flex gap-2"><Plus />Add Product</button>
                </div>
                <div className="overflow-x-auto">
                    <DataTable headers={HEADERS}>

                        {data?.data?.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td><NameDescriptionCell name={item.name} description={item.description} /></td>
                                    <td><img width="100" height='100' src={item?.images[0]} alt={item.name} /></td>
                                    <td><SpecsCell specs={item.specifications} /></td>
                                    <td>
                                        <div>
                                            <p>Price: {item.price || '--'}</p>
                                            <p>Discount Price: {item.discountPrice || '--'}</p>
                                        </div>
                                    </td>
                                    <td>{item.sku || '--'}</td>
                                    <td>{item.stock || '--'}</td>
                                    <td>
                                        <div className="flex gap-3 items-center mt-3">
                                            <Button onClick={() => goToEdit(item?._id)} className="!px-2"><Pencil /></Button>
                                            <Button className="!px-2" onClick={() => handleDelete(item._id)}><Trash /></Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </DataTable>

                </div>
            </div>
        </main>
    );
};

export default BlogGridPage;
