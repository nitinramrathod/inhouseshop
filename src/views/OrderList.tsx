"use client"
import Button from "@/components/dashboard/forms/Button";
import { useRouter } from "next/navigation";
import { useGetProducts } from "@/utils/hooks/product";
import DataTable from "@/components/dashboard/table/DataTable";
import { LaptopSpecs } from "@/types/product";
import { Eye, Pencil, Trash } from "lucide-react";
import PageHeader from "@/components/dashboard/table/PageHeader";
import RowLoader from "@/components/dashboard/table/RowLoader";
import { useOrderMutations, useOrders } from "@/utils/hooks/order";

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


const OrderList = () => {
    const router = useRouter();
    const { data, isPending, refetch } = useOrders({ mine: false });
    const { deleteOrder } = useOrderMutations();


    const goToEdit = (id) => {
        router.push(`/admin/products/${id}`)
    }

    const handleDelete = async (id: string) => {
        deleteOrder.mutate(id + 'dd', {
            onError: (err: any) => {
                console.log('onError==>', err)
            },
            onSuccess: (res: any) => {
                console.log('onSuccess==>', res)
            }
        });
    }

    const HEADERS = ['Product', 'Buyer', 'Total', 'Order Status', 'Payment', 'Payment Method', 'Order Date', 'Action'];

    return (

        <div className="mx-auto px-4">
            <PageHeader href="/admin/orders/create" title="Order List" buttonText="Add Order" />
            <div className="overflow-x-auto">
                <DataTable headers={HEADERS}>
                    {isPending ? <RowLoader rows={15} cols={HEADERS.length} /> : data?.data?.map(item => {
                        return (
                            // <tr key={item._id}>
                            <tr className="border-b hover:bg-slate-50 transition" key={item._id + "_order"}>

                                {/* Items */}
                                <td className="px-4 py-3 text-sm">
                                    <ul className="space-y-1">
                                        {item.items.map((item: any, idx: number) => (
                                            <li key={idx} className="text-slate-700">
                                                <span className="font-medium">{item?.product?.name || "--"}</span>
                                                <span className="text-slate-500"> × {item?.quantity || "--"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>

                                {/* User */}
                                <td className="px-4 py-3 text-sm">
                                    <div className="font-medium text-slate-800">
                                        {item.user?.email || "Guest"}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {item.shippingAddress?.country}
                                    </div>
                                </td>

                                {/* Total */}
                                <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                                    ₹{item.totalAmount.toLocaleString()}
                                </td>

                                {/* Order Status */}
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium
        ${item.orderStatus === "PENDING"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                            }
      `}
                                    >
                                        {item.orderStatus}
                                    </span>
                                </td>

                                {/* Payment Status */}
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium
        ${item.paymentStatus === "PENDING"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                            }
      `}
                                    >
                                        {item.paymentStatus}
                                    </span>
                                </td>

                                {/* Payment Method */}
                                <td className="px-4 py-3 text-sm text-slate-700">
                                    {item.paymentMethod}
                                </td>

                                {/* Date */}
                                <td className="px-4 py-3 text-sm text-slate-600">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>

                                {/* Action */}
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex px-4 py-3 gap-3 items-center mt-3">

                                        <button className="text-blue-600 hover:underline font-medium">
                                            <Eye size={'1.2rem'} />
                                        </button>
                                        {/* <button onClick={() => handleEdit(item?._id)} className="!px-2"><Pencil size={'1.2rem'} /></button> */}
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

export default OrderList;
