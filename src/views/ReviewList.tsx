"use client"
import Button from "@/components/dashboard/forms/Button";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/utils/hooks/product";
import DataTable from "@/components/dashboard/table/DataTable";
import { LaptopSpecs } from "@/types/product";
import { Pencil, Trash } from "lucide-react";
import PageHeader from "@/components/dashboard/table/PageHeader";
import RowLoader from "@/components/dashboard/table/RowLoader";
import { useReviews } from "@/utils/hooks/review";
import RowNoDataFound from "@/components/dashboard/table/RowNoDataFound";

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


const ReviewList = ({ productId }: { productId: string }) => {
    const router = useRouter();
    const { data, isPending, refetch } = useReviews(productId);

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
            refetch()
        }
    }

    const HEADERS = ['Product', 'Rating', 'Comment', 'Name', 'Created At', 'Action'];

    return (

        <div className="mx-auto px-4">
            <PageHeader href="/admin/reviews/create" backTo={'/admin/products'} title="Review List" buttonText="Add Review" />
            <div className="overflow-x-auto">
                <DataTable headers={HEADERS}>
                    {isPending ? <RowLoader rows={15} cols={HEADERS.length} /> : data?.data?.length > 0 ? data?.data?.map(item => {
                        return (
                            <tr key={item._id}>
                                <td className="px-2">{item.product}</td>
                                <td className="px-2">{item.rating}</td>
                                <td className="px-2">{item.comment}</td>
                                <td className="px-2">{item.user.firstName} {item.user.firstName}</td>
                                <td className="px-2">{item.createdAt}</td>
                                <td className="px-2">
                                    <div className="flex px-4 py-3 gap-3 items-center mt-3">
                                        <Button onClick={() => goToEdit(item?._id)} className="!px-2"><Pencil size={'1rem'} /></Button>
                                        {/* <button onClick={() => handleEdit(item?._id)} className="!px-2"><Pencil size={'1.2rem'} /></button> */}
                                        <button className="text-red" onClick={() => handleDelete(item._id)}><Trash size={'1.2rem'} /></button>

                                    </div>
                                </td>
                            </tr>
                        )
                    }): <RowNoDataFound cols={HEADERS.length}/>}
                </DataTable>
            </div>
        </div>
    );
};

export default ReviewList;
