"use client"

import Button from '@/components/dashboard/forms/Button'
import Input from '@/components/dashboard/forms/Input'
import Textarea from '@/components/dashboard/forms/Textarea'
import { useCategories } from '@/utils/hooks/category'
import { useProductMutations } from '@/utils/hooks/product/useProductMutation'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProductDetail = ({ data }: any) => {
    const router = useRouter()
    const { createProduct, updateProduct } = useProductMutations()
    const [isEdit, setIsEdit] = useState(false);
    const { data: categories } = useCategories();

    const [form, setForm] = useState({
        name: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        discountPrice: '',
        stock: '',
        sku: '',
        processor: '',
        ram: '',
        storage: '',
        graphics: '',
        display: '',
        os: '',
        images: [] as File[],
    })

    useEffect(() => {
        if (data) {
            setIsEdit(true)
            setForm({
                ...data,
                images: data.images?.join(',') || '',
                ...data.specifications,
            })
        }
    }, [data]);

    console.log('product data', form)


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return

        setForm(prev => ({
            ...prev,
            images: Array.from(e.target.files),
        }))
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', form.name)
        formData.append('brand', form.brand)
        formData.append('category', form.category)
        formData.append('description', form.description)
        formData.append('price', String(form.price))
        formData.append('discountPrice', String(form.discountPrice))
        formData.append('stock', String(form.stock))
        formData.append('sku', form.sku)

        // Specifications
        const specifications = {
            processor: form.processor,
            ram: form.ram,
            storage: form.storage,
            graphics: form.graphics,
            display: form.display,
            os: form.os,
        };

        formData.append('specifications', JSON.stringify(specifications))

        form.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file)
        })

        if (isEdit) {
            updateProduct.mutate({ productId: data?._id, payload: formData }, {
                onSuccess: () => router.push('/admin/products'),
            })

        } else {
            createProduct.mutate(formData, {
                onSuccess: () => router.push('/admin/products'),
            })
        }
    }


    return (
        <div className='p-3 mx-auto pt-9'>
            <div className="flex mb-6 items-center gap-5">
                <Button onClick={() => router.push('/admin/products')} className='!px-2'>
                    <MoveLeft />
                </Button>
                <h1 className='text-2xl'>{isEdit ? "Edit Product" : "Create Product"}</h1>
            </div>

            <form onSubmit={handleSubmit} className='grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                <Input label='Name' name='name' onChange={handleChange} value={form.name} />
                <Input label='Brand' name='brand' onChange={handleChange} value={form.brand} />

                <div>
                    <label htmlFor="category" className='block pb-2'>Select Category</label>

                    <select
                        id='category'
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        required
                    >
                        <option value="" disabled>Select Category</option>

                        {categories?.map((cat: any) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Input label='Price' name='price' type='number' onChange={handleChange} value={form.price} />
                <Input label='Discount Price' name='discountPrice' type='number' onChange={handleChange} value={form.discountPrice} />
                <Input label='Stock' name='stock' type='number' onChange={handleChange} value={form.stock} />

                <Input label='Processor' name='processor' onChange={handleChange} value={form.processor} />
                <Input label='RAM' name='ram' onChange={handleChange} value={form.ram} />
                <Input label='Storage' name='storage' onChange={handleChange} value={form.storage} />
                <Input label='Graphics' name='graphics' onChange={handleChange} value={form.graphics} />
                <Input label='Display' name='display' onChange={handleChange} value={form.display} />
                <Input label='OS' name='os' onChange={handleChange} value={form.os} />

                <Input
                    label='Select Product Image'
                    name='image'
                    placeholder='Select Product Image'
                    type="file"
                    onChange={handleImageChange}
                />

                <Textarea label='Description' name='description' onChange={handleChange} value={form.description} className='md:col-span-3' />

                <div className='mt-6'>
                    <Button type='submit'>
                        {isEdit ? 'Update Product' : 'Create Product'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ProductDetail
