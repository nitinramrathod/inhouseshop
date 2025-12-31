"use client"
import Button from '@/components/dashboard/forms/Button';
import Input from '@/components/dashboard/forms/Input';
import Textarea from '@/components/dashboard/forms/Textarea';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const backendURL = 'http://localhost:3001';

interface FormData {
    name?: string;
    brand?: string;
    category?: string;
    stock?: string;
    specifications?: any;
    price?: number | string;
    discountPrice?: number | string;
    description?: string;
    image?: File | string;
}

const ProductDetail = ({data}:any) => {
    console.log('data', data)
    const [form, setForm] = useState<FormData>({});
    const [isEdit, setIsEdit] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setForm((prev) => ({
          ...prev,
          [e.target.name]: file || null
        }));
      };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            formData.append('name', form?.name);
            formData.append('price', form?.price?.toString());
            formData.append('discountPrice', form?.discountPrice?.toString());
            formData.append('description', form?.description);

            if (form.image) {
                formData.append('image', form.image);
            }

            const url = isEdit ? `${backendURL}/products/${data?._id}`: `${backendURL}/products`
            const method = isEdit ? 'PUT' : 'POST'

            const res = await fetch(url,
                {
                    method: method,
                    body: formData,
                    headers:{                        
                        contentType: 'multipart/form-data'
                    }
                })

            if (res.ok) {
                setForm({})
                router.push('/admin/products')
            } else {
                alert('Error while creating product.')
            }

        } catch (error) {

        }
    }

    const goToList = ()=>{
        router.push('/admin/products')
    }

    useEffect(() => {
        if(data){
            setIsEdit(true)
            setForm(data)
        }
    }, [data])
    

    return (
        <div className='p-3 mx-auto pt-9'>
            <div className="flex mb-6 items-center gap-5">
                <Button onClick={goToList} className='!px-2'><span className="material-symbols-outlined">arrow_back</span></Button>
                <h1 className='text-[2rem]  leading-[3rem]'>{isEdit ? "Edit Product":'Create Product'}</h1>
            </div>
            <div className='grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                <Input
                    label='Enter Name'
                    name='name'
                    placeholder='Enter Product Name'
                    onChange={handleInputChange}
                    value={form?.name || ""}
                />
                 <Input
                    label='Enter brand'
                    name='brand'
                    placeholder='Enter Product brand'
                    onChange={handleInputChange}
                    value={form?.brand || ""}
                />
                <Input
                    label='Enter Price'
                    name='price'
                    type="number"
                    placeholder='Enter Product Price'
                    onChange={handleInputChange}
                    value={form?.price || ""}
                />
                <Input
                    label='Enter Discount Price'
                    name='discountPrice'
                    type="number"
                    placeholder='Enter Product Discount Price'
                    onChange={handleInputChange}
                    value={form?.discountPrice || ""}
                />
                <div>

                <Input
                    label='Select Product Image'
                    name='image'
                    placeholder='Select Product Image'
                    type="file"
                    onChange={handleImageChange}
                    />
                    {isEdit && <img className='mt-3 rounded-md w-full aspect-[2/.7] object-cover' src={`${backendURL}${data?.image}`} />}
                    </div>
                <Textarea value={form?.description || ""} name="description" onChange={handleInputChange} className=' col-start-1  md:col-end-3 lg:col-end-4 row-end-3 gr' />

            </div>
            <div className='mt-9'>

                <Button onClick={handleSubmit} >{isEdit?"Update":'Submit'}</Button>
            </div>

        </div>
    )
}

export default ProductDetail