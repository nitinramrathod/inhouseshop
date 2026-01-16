"use client"
import DataTable from "@/components/dashboard/table/DataTable";
import { LaptopSpecs } from "@/types/product";
import { Pencil, Trash } from "lucide-react";
import PageHeader from "@/components/dashboard/table/PageHeader";
import RowLoader from "@/components/dashboard/table/RowLoader";
import { useCategories, useCategoryMutations } from "@/utils/hooks/category";
import { formatDateTime } from "@/utils/helper/formatDateTime";
import Link from "next/link";



const HeroBannerList = () => {
    const { data, refetch, isPending } = useCategories();
    const {deleteCategory}= useCategoryMutations();

    const handleDelete = async (id:string) => {
        deleteCategory.mutate(id, {
            onError: (err:any)=>{
                 console.log('onError==>',err)
            },
            onSuccess:(res:any)=>{
                console.log('onSuccess==>',res)
            }
        });
    }

    const HEADERS = ['Name', 'Slug', 'Status', 'Created At', 'Action'];

    return (
        <div className="mx-auto px-4">
            <PageHeader href="/admin/hero-banners/create" title="Hero Banner List" buttonText="Add Hero Banner" />
            <div className="overflow-x-auto">
                <DataTable headers={HEADERS}>
                    {isPending ? <RowLoader rows={15} cols={HEADERS.length} /> : data?.map(item => {
                        return (
                            <tr key={item._id}>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">
                                        {item.name}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        ID: {item._id}
                                    </div>
                                </td>

                                {/* Slug */}
                                <td className="px-6 py-4 text-slate-600 lowercase">
                                    {item.slug}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex text-white items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.isActive
                                                ? "bg-green "
                                                : "bg-red"
                                            }`}
                                    >
                                        {item.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                {/* Created At */}
                                <td className="px-6 py-4 text-slate-600">
                                    {formatDateTime(item.createdAt)}
                                </td>

                                <td className="px-4">
                                    <div className="flex px-4 py-3 gap-3 items-center mt-3">
                                        <Link href={`/admin/categories/edit/${item._id}`} className="!px-2"><Pencil size={'1.2rem'} /></Link>
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

export default HeroBannerList;
