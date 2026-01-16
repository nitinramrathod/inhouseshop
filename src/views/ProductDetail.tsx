"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Button from "@/components/dashboard/forms/Button"
import Input from "@/components/dashboard/forms/Input"
import Textarea from "@/components/dashboard/forms/Textarea"
import { useCategories } from "@/utils/hooks/category"
import { useProductMutations } from "@/utils/hooks/product/useProductMutation"
import { MoveLeft } from "lucide-react"
import { preview_icon } from "@/assets/icons/common"

interface ProductDetailProps {
  data?: any // Product data if editing
}

const ProductDetail: React.FC<ProductDetailProps> = ({ data }) => {
  const router = useRouter()
  const { createProduct, updateProduct } = useProductMutations()
  const { data: categories } = useCategories()
  const [isEdit, setIsEdit] = useState(false)

  // Separate states for existing images and new files
  const [removedImages, setRemovedImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])

  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    discountedPrice: "",
    stock: "",
    sku: "",
    processor: "",
    ram: "",
    storage: "",
    graphics: "",
    display: "",
    os: "",
    images:[] as File[] | string[]
  })

  useEffect(() => {
    if (data) {
      setIsEdit(true)
      setForm({
        title: data.title || "",
        brand: data.brand || "",
        category: data.category || "",
        description: data.description || "",
        price: data.price || "",
        discountedPrice: data.discountedPrice || "",
        stock: data.stock || "",
        sku: data.sku || "",
        processor: data.specifications?.processor || "",
        ram: data.specifications?.ram || "",
        storage: data.specifications?.storage || "",
        graphics: data.specifications?.graphics || "",
        display: data.specifications?.display || "",
        os: data.specifications?.os || "",
        images: data.images || []
      })
    }
  }, [data])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewImages(prev => [...prev, ...Array.from(e.target.files)])
  }

  const handleRemoveImage = (index: number| string, type: "existing" | "new") => {
    if (type === "existing") {
      setForm((prev:any) => {
        const images = prev.images.filter((imgUrl, i) => imgUrl !== index);
        return({
          ...prev,
          images
        })
      });
      
      setRemovedImages(prev => [...prev, index as string]);
    } else {
      setNewImages(prev => prev.filter((_, i) => i !== index));
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()

    // Append regular fields
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as any)
    })

    // Specifications as JSON
    const specifications = {
      processor: form.processor,
      ram: form.ram,
      storage: form.storage,
      graphics: form.graphics,
      display: form.display,
      os: form.os,
    }
    formData.append("specifications", JSON.stringify(specifications))

    removedImages.length > 0 && removedImages.forEach((url,i) => formData.append(`removedImages[${i}]`, url));

    newImages.length > 0 && newImages.forEach((file, i) => formData.append(`images[${i}]`, file))

    if (isEdit) {      
      updateProduct.mutate({ productId: data._id, payload: formData }, {
        onSuccess: () => router.push("/admin/products"),
      })
    } else {      
      createProduct.mutate(formData, {
        onSuccess: () => router.push("/admin/products"),
      })
    }
  }

  return (
    <div className="p-3 mx-auto pt-9">
      <div className="flex mb-6 items-center gap-5">
        <Button onClick={() => router.push("/admin/products")} className="!px-2">
          <MoveLeft />
        </Button>
        <h1 className="text-2xl">{isEdit ? "Edit Product" : "Create Product"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <Input label="Title" name="title" value={form.title} onChange={handleChange} />
        <Input label="Brand" name="brand" value={form.brand} onChange={handleChange} />

        <div>
          <label htmlFor="category" className="block pb-2">Select Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="" disabled>Select Category</option>
            {categories?.map((cat: any) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <Input label="Price" name="price" type="number" value={form.price} onChange={handleChange} />
        <Input label="Discount Price" name="discountedPrice" type="number" value={form.discountedPrice} onChange={handleChange} />
        <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />

        <Input label="Processor" name="processor" value={form.processor} onChange={handleChange} />
        <Input label="RAM" name="ram" value={form.ram} onChange={handleChange} />
        <Input label="Storage" name="storage" value={form.storage} onChange={handleChange} />
        <Input label="Graphics" name="graphics" value={form.graphics} onChange={handleChange} />
        <Input label="Display" name="display" value={form.display} onChange={handleChange} />
        <Input label="OS" name="os" value={form.os} onChange={handleChange} />

        <div className="col-span-1 md:col-span-3">
          <label className="block mb-2">Product Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
            className="border rounded p-2 w-full"
          />

          <div className="flex gap-4 pt-5 flex-wrap">
            {form.images.map((url, i) => {          
              return (
                <div key={i} className="relative">
                  <img src={url} alt="existing" width={70} height={70} className="border rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url, "existing")}
                    className="absolute top-[-10px] right-[-10px] bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                  >x</button>
                </div>)
            })}

            {newImages.map((file, i) => {
              const preview = URL.createObjectURL(file)
              return (
                <div key={i} className="relative">
                  <img src={preview} alt="new" width={70} height={70} className="border rounded-md" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i, "new")}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >x</button>
                </div>
              )
            })}
          </div>
        </div>

        <Textarea label="Description" name="description" value={form.description} onChange={handleChange} className="md:col-span-3" />

        <div className="mt-6">
          <Button type="submit">{isEdit ? "Update Product" : "Create Product"}</Button>
        </div>
      </form>
    </div>
  )
}

export default ProductDetail

