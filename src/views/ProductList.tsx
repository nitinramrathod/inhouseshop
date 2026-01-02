"use client"
import Button from "@/components/dashboard/forms/Button";
import { useRouter } from "next/navigation";
import { useGetProducts, useProductMutations } from "@/utils/hooks/product";
import DataTable from "@/components/dashboard/table/DataTable";
import { LaptopSpecs } from "@/types/product";
import { MessageSquareText, Pencil, Trash } from "lucide-react";
import PageHeader from "@/components/dashboard/table/PageHeader";
import RowLoader from "@/components/dashboard/table/RowLoader";
import Link from "next/link";

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


const ProductList = () => {
    const { data, isPending} = useGetProducts();
    const {deleteProduct} = useProductMutations();

    const handleDelete = async (id:string) => {
        deleteProduct.mutate(id, {
            onError: (err:any)=>{
                 console.log('onError==>',err)
            },
            onSuccess:(res:any)=>{
                console.log('onSuccess==>',res)
            }
        });
    }

    const HEADERS = ['Name', 'Image', 'Specifications', 'Price', 'SKU', 'Stock', 'Action'];

    return (

        <div className="mx-auto px-4">
            <PageHeader href="/admin/products/create" title="Product List" buttonText="Add Product" />
            <div className="overflow-x-auto">
                <DataTable headers={HEADERS}>
                    {isPending ? <RowLoader rows={15} cols={HEADERS.length} /> : data?.map(item => {
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
                                    <div className="flex px-4 py-3 gap-3 items-center mt-3">
                                        <Link href={`/admin/reviews/${item._id}`} title={`View reviews of ${item.name}`}><MessageSquareText size={'1.2rem'} /></Link>
                                        <Link href={`/admin/products/edit/${item._id}`} className="!px-2"><Pencil size={'1.2rem'} /></Link>                                        
                                        <button className="text-red" onClick={() => handleDelete(item._id)}><Trash size={'1.2rem'} /></button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </DataTable>
            </div>
        </div>
    );
};

export default ProductList;
