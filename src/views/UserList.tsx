"use client"
import Button from "@/components/dashboard/forms/Button";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/utils/hooks/product";
import DataTable from "@/components/dashboard/table/DataTable";
import { LaptopSpecs } from "@/types/product";
import { Pencil, Trash } from "lucide-react";
import PageHeader from "@/components/dashboard/table/PageHeader";
import RowLoader from "@/components/dashboard/table/RowLoader";
import { useUserMutations, useUsers } from "@/utils/hooks/user";
import { formatDateTime } from "@/utils/helper/formatDateTime";
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


const UserList = () => {

    const { data, isPending } = useUsers();
    const {deleteUser} = useUserMutations();

    const handleDelete = async (id:string) => {
        deleteUser.mutate(id, {
            onError: (err:any)=>{
                 console.log('onError==>',err)
            },
            onSuccess:(res:any)=>{
                console.log('onSuccess==>',res)
            }
        });
    }

    const HEADERS = ['Name', 'Email', 'Role', 'Status', 'Joined At', 'Action'];

    return (

        <div className="mx-auto px-4">
            <PageHeader href="/admin/users/create" title="User List" buttonText="Add User" />
            <div className="overflow-x-auto">
                <DataTable headers={HEADERS}>
                    {isPending ? <RowLoader rows={15} cols={HEADERS.length} /> : data?.data?.map(item => {
                        return (
                            <tr key={item._id}>
                                <td className="px-4">{item.firstName} {item.lastName}</td>                                
                                <td className="px-4">{item.email || '--'}</td>
                                <td className="px-4">{item.role || '--'}</td>
                                <td className="px-4">{item.isActive ? <p className="text-green">Active</p> : <p className="text-red">Inactive</p> }</td>
                                <td className="px-4">{formatDateTime(item.createdAt) || '--'}</td>
                                <td className="px-4">
                                    <div className="flex px-4 py-3 gap-3 items-center mt-3">
                                        <Link href={`/admin/users/edit/${item._id}`} className="!px-2"><Pencil size={'1.2rem'} /></Link>
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

export default UserList;
