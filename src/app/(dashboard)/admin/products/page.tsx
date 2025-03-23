"use client"

import React, { useEffect, useState } from "react";
// import { Metadata } from "next";
import Button from "@/components/dashboard/forms/Button";
import { useRouter } from "next/navigation";
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

const BlogGridPage = () => {
    const router = useRouter();
    const [products, setProducts] = useState([])


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


    return (
        <main>
            {/* Display products */}
            <div className="mx-auto max-w-[1200px] px-4">

                <div className="flex justify-between my-4">

                    <h1 className="text-[2rem] leading-[2rem]">Product List</h1>
                    <Button onClick={goToCreate}>Add Product</Button>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full min-w-[992px] table-auto border-collapse border border-gray-300 shadow-lg bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="bg-[#33d476] text-white border-0  px-4 py-2 text-left">#</th>
                        <th className="bg-[#33d476] text-white px-4 py-2 text-left">Name</th>
                        <th className="bg-[#33d476] text-white px-4 py-2 text-left">Description</th>
                        <th className="bg-[#33d476] text-white px-4 py-2 text-left">Discount Price</th>
                        <th className="bg-[#33d476] text-white px-4 py-2 text-left">Price</th>
                        <th className="bg-[#33d476] text-white px-4 py-2 text-left">Image</th>
                        <th className="bg-[#33d476] text-white px-4 py-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    {products.length === 0 ? (
                        <p>No products available</p>
                    ) : (
                        <tbody>{
                            products?.map((product, i) => (<tr key={product._id} className="odd:bg-gray-50 even:bg-white hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-1">{i+1}</td>
                                <td className="border border-gray-300 px-4 py-1">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-1">{product?.description}</td>
                                <td className="border border-gray-300 px-4 py-1">{product?.price}</td>
                                <td className="border border-gray-300 px-4 py-1 text-green-600 font-semibold">{product?.discount_price}</td>
                                <td className="border border-gray-300 px-4 py-1">                                <img className="max-w-full w-[100px] rounded-md" src={`${backendURL}${product.image}`} alt={product.name} />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <div className="flex gap-3 items-center mt-3">
                                        <Button onClick={() => goToEdit(product?._id)} className="!px-2">Edit</Button>
                                        <Button className="!px-2" onClick={() => handleDelete(product._id)}> Delete</Button>
                                    </div>
                                </td>
                            </tr>
                            ))
                        }
                        </tbody>
                    )}
                       
                </table>
            </div>
            </div>
        </main>
    );
};

export default BlogGridPage;
