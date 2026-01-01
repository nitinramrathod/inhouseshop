"use client"

import Button from '@/components/dashboard/forms/Button'
import Input from '@/components/dashboard/forms/Input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MoveLeft, Plus, Trash } from 'lucide-react'
import { useUserMutations } from '@/utils/hooks/user'
// import { useUserMutations } from '@/utils/hooks/user/useUserMutation'

const emptyAddress = {
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: 'India',
    pincode: '',
    type: 'HOME',
    isDefault: false,
}

const CreateUser = ({ data }: any) => {
    const router = useRouter()
    const { register } = useUserMutations()
    const [isEdit, setIsEdit] = useState(false)

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'BUYER',
        addresses: [] as typeof emptyAddress[],
    })

    React.useEffect(() => {
        if (data) {
            setIsEdit(true)
            setForm({ ...data })
        }
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleAddressChange = (index: number, field: string, value: any) => {
        const updated = [...form.addresses]
        updated[index] = { ...updated[index], [field]: value }
        setForm(prev => ({ ...prev, addresses: updated }))
    }

    const addAddress = () => {
        setForm(prev => ({
            ...prev,
            addresses: [...prev.addresses, emptyAddress],
        }))
    }

    const removeAddress = (index: number) => {
        setForm(prev => ({
            ...prev,
            addresses: prev.addresses.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        register.mutate(form, {
            onSuccess: () => router.push('/admin/users'),
        })
    }

    return (
        <div className='p-3 mx-auto pt-9'>
            <div className="flex mb-6 items-center gap-5">
                <Button onClick={() => router.push('/admin/users')} className='!px-2'>
                    <MoveLeft />
                </Button>
                <h1 className='text-2xl'>{isEdit ? "Edit User" : "Create User"}</h1>
            </div>

            <form onSubmit={handleSubmit} className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                <Input label='First Name' name='firstName' value={form.firstName} onChange={handleChange}  />
                <Input label='Last Name' name='lastName' value={form.lastName} onChange={handleChange}  />
                <Input label='Email' name='email' value={form.email} onChange={handleChange}  />
                {!isEdit && (
                    <Input label='Password' name='password' type='password' value={form.password} onChange={handleChange}  />
                )}

                <div>
                    <label className='block pb-2'>Role</label>
                    <select
                        name='role'
                        value={form.role}
                        onChange={handleChange}
                        className='border rounded p-2 w-full'
                    >
                        <option value="BUYER">Buyer</option>
                        <option value="SELLER">Seller</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                {/* Addresses */}
                <div className="md:col-span-2 lg:col-span-3 mt-6">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl">Addresses</h2>
                        <Button type="button" onClick={addAddress}>
                            <Plus size={16} /> Add Address
                        </Button>
                    </div>

                    {form.addresses.map((addr, i) => (
                        <div key={i} className="border rounded p-4 mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                            <Input label='Full Name' value={addr.fullName} onChange={e => handleAddressChange(i, 'fullName', e.target.value)} />
                            <Input label='Phone' value={addr.phone} onChange={e => handleAddressChange(i, 'phone', e.target.value)} />
                            <Input label='Address Line 1' value={addr.addressLine1} onChange={e => handleAddressChange(i, 'addressLine1', e.target.value)} />
                            <Input label='Address Line 2' value={addr.addressLine2} onChange={e => handleAddressChange(i, 'addressLine2', e.target.value)} />
                            <Input label='City' value={addr.city} onChange={e => handleAddressChange(i, 'city', e.target.value)} />
                            <Input label='State' value={addr.state} onChange={e => handleAddressChange(i, 'state', e.target.value)} />
                            <Input label='Pincode' value={addr.pincode} onChange={e => handleAddressChange(i, 'pincode', e.target.value)} />

                            <div>
                                <label className='block pb-2'>Type</label>
                                <select
                                    value={addr.type}
                                    onChange={e => handleAddressChange(i, 'type', e.target.value)}
                                    className="border rounded p-2 w-full"
                                >
                                    <option value="HOME">Home</option>
                                    <option value="WORK">Work</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 mt-6">
                                <input
                                    type="checkbox"
                                    checked={addr.isDefault}
                                    onChange={e => handleAddressChange(i, 'isDefault', e.target.checked)}
                                />
                                <label>Default Address</label>
                            </div>

                            <Button type="button" className="bg-red-500 mt-6" onClick={() => removeAddress(i)}>
                                <Trash size={16} /> Remove
                            </Button>

                        </div>
                    ))}
                </div>

                <div className='mt-6'>
                    <Button type='submit'>
                        {isEdit ? 'Update User' : 'Create User'}
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default CreateUser
