import React from "react"

interface ProductSpecificationsProps {
  specifications: {
    processor: string
    ram: string
    storage: string
    graphics: string
    display: string
    os: string
  }
}

const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  const specs = [
    { label: "Processor", value: specifications.processor },
    { label: "RAM", value: specifications.ram },
    { label: "Storage", value: specifications.storage },
    { label: "Graphics", value: specifications.graphics },
    { label: "Display", value: specifications.display },
    { label: "Operating System", value: specifications.os },
  ]

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Specifications
        </h2>
        <p className="text-sm text-slate-500">
          Technical details of the product
        </p>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 px-6 py-5">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between border-b border-dashed border-slate-200 py-2 "
          >
            <span className="text-sm text-slate-500">
              {spec.label}
            </span>
            <span className="text-sm font-medium text-slate-900">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductSpecifications
