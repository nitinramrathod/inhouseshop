"use client"

import Button from '@/components/dashboard/forms/Button'
import Input from '@/components/dashboard/forms/Input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MoveLeft } from 'lucide-react'
import Select from '../forms/Select'
import { useBannerMutations } from '@/utils/hooks/banner/useBannerMutations'
import { BannerPayload } from '@/utils/services/banner.service'


const types = [
    {
        label: "Banner",
        value: 'BANNER'
    },
    {
        label: "Slider",
        value: 'SLIDER'
    }
]
const BANNER_POSITION_OPTIONS = [
    {
        value: "HOME_TOP_LEFT_SLIDER",
        label: "Home – Top Left (Slider)",
    },
    {
        value: "HOME_TOP_RIGHT_TOP",
        label: "Home – Top Right (Top Banner)",
    },
    {
        value: "HOME_TOP_RIGHT_BOTTOM",
        label: "Home – Top Right (Bottom Banner)",
    },
    {
        value: "HOME_MIDDLE_TOP",
        label: "Home – Middle (Top Banner)",
    },
    {
        value: "HOME_MIDDLE_BOTTOM_LEFT",
        label: "Home – Middle (Bottom Left Banner)",
    },
    {
        value: "HOME_MIDDLE_BOTTOM_RIGHT",
        label: "Home – Middle (Bottom Right Banner)",
    },
];

const HeroBannerDetail = ({ data }: any) => {
    const router = useRouter()
    const { createBanner, updateBanner } = useBannerMutations()

    const [isEdit, setIsEdit] = useState(false)

    const [form, setForm] = useState<BannerPayload>({
        title: '',
        subtitle: '',
        redirectUrl: '',
        position: '',
        product: '',
        type: '',
        discountPercentage: 0,
        priority: 0,
        // isActive: true,
        startAt: '',
        endAt: '',
        image: ''
    })

    React.useEffect(() => {
        if (data) {
            setIsEdit(true)
            // setForm({
            //     isActive: data.isActive,
            // })
        }
    }, [data])

    const handleChange = (e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >) => {
        const target = e.target;

        if (target instanceof HTMLInputElement && target.type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [target.name]: target.checked,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [target.name]: target.value,
            }));
        }

    }

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        const formData = new FormData()

        Object.entries(form).forEach(([key, value]) => {
            if (value) {
                formData.append(key, value as any)
            }
        })

        if (isEdit) {
            updateBanner.mutate({ bannerId: data?._id, payload: formData }, {
                onSuccess: () => router.push('/admin/banners'),
            })

        } else {
            createBanner.mutate(formData, {
                onSuccess: () => router.push('/admin/banners'),
            })
        }
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target

        console.log(name, files.length)

        if (!files || files.length === 0) return

        setForm(prev => ({
            ...prev,
            [name]: files[0], // store single File
        }))
    }



    return (
        <div className='p-3 mx-auto pt-9'>
            <div className="flex mb-6 items-center gap-5">
                <Button onClick={() => router.push('/admin/banners')} className='!px-2'>
                    <MoveLeft />
                </Button>
                <h1 className='text-2xl'>
                    {isEdit ? "Edit Banner" : "Create Banner"}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                <Input
                    label='Title'
                    name='title'
                    onChange={handleChange}
                    value={form.title}
                />
                <Input
                    label='Sub Title'
                    name='subtitle'
                    onChange={handleChange}
                    value={form.subtitle}
                />
                <Select
                    value={form.type}
                    onChange={handleChange}
                    id="dd"
                    label="Select Type"
                    name='type'
                    options={types}
                />
                <Select
                    value={form.position}
                    onChange={handleChange}
                    id="position"
                    label="Select Postion"
                    name='position'
                    options={BANNER_POSITION_OPTIONS}
                />

                <Input
                    label='Image'
                    name='image'
                    type='file'
                    onChange={handleImageSelect}
                />

                <Input
                    label='Redirect URL'
                    name='redirectUrl'
                    onChange={handleChange}
                    value={form.redirectUrl}
                />
                <Input
                    label='discountPercentage'
                    name='discountPercentage'
                    onChange={handleChange}
                    value={form.discountPercentage}
                />
                <Input
                    label='priority'
                    name='priority'
                    onChange={handleChange}
                    value={form.priority}
                />

                <Input
                    label='startAt'
                    name='startAt'
                    type="date"
                    onChange={handleChange}
                    value={form.startAt}
                    placeholder="e.g. gaming-laptops"
                />
                <Input
                    label='endAt'
                    name='endAt'
                    type="date"
                    onChange={handleChange}
                    value={form.endAt}
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
