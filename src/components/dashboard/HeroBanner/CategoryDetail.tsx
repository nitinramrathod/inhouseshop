"use client"

import Button from '@/components/dashboard/forms/Button'
import Input from '@/components/dashboard/forms/Input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MoveLeft } from 'lucide-react'
import { useCategoryMutations } from '@/utils/hooks/category'

const HeroBannerDetail = ({ data }: any) => {
    const router = useRouter()
    const { createCategory, updateCategory } = useCategoryMutations()

    const [isEdit, setIsEdit] = useState(false)

    const [form, setForm] = useState({
        name: '',
        slug: '',
        isActive: true,
    })

    React.useEffect(() => {
        if (data) {
            setIsEdit(true)
            setForm({
                name: data.name,
                slug: data.slug,
                isActive: data.isActive,
            })
        }
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            updateCategory.mutate({categoryId: data?._id, payload:form}, {
                onSuccess: () => router.push('/admin/categories'),
            })

        } else {
            createCategory.mutate(form, {
                onSuccess: () => router.push('/admin/categories'),
            })
        }
    }

    return (
        <div className='p-3 mx-auto pt-9'>
            <div className="flex mb-6 items-center gap-5">
                <Button onClick={() => router.push('/admin/hero-banners')} className='!px-2'>
                    <MoveLeft />
                </Button>
                <h1 className='text-2xl'>
                    {isEdit ? "Edit Hero Banner" : "Create Hero Banner"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                <Input
                    label='Category Name'
                    name='name'
                    onChange={handleChange}
                    value={form.name}
                />

                <Input
                    label='Slug'
                    name='slug'
                    onChange={handleChange}
                    value={form.slug}
                    placeholder="e.g. gaming-laptops"
                />

                <div className="flex items-center gap-3 mt-6">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={form.isActive}
                        onChange={handleChange}
                        className="w-5 h-5"
                    />
                    <label htmlFor="isActive" className="font-medium">
                        Active Category
                    </label>
                </div>

                <div className='mt-6'>
                    <Button type='submit'>
                        {isEdit ? 'Update Category' : 'Create Category'}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default HeroBannerDetail
