type Address = {
  _id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  type: 'HOME' | 'OFFICE';
  isDefault: boolean;
};

type Props = {
  addresses: Address[];
  selectedAddressId?: string;
  onSelect: (address: Address) => void;
};

export default function AddressSelectCard({
  addresses,
  selectedAddressId,
  onSelect,
}: Props) {
  return (
    <div className="grid gap-4">
      {addresses.map((address) => {
        const isSelected = selectedAddressId === address._id;

        return (
          <div
            key={address._id}
            onClick={() => onSelect(address)}
            className={`
              cursor-pointer bg-white rounded-xl border p-4 transition
              ${isSelected
                ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500'
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">
                {address.fullName}
              </h3>

              <div className="flex items-center gap-2">
                {address.isDefault && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Default
                  </span>
                )}

                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                  {address.type}
                </span>
              </div>
            </div>

            {/* Address */}
            <p className="mt-2 text-sm text-gray-700">
              {address.addressLine1}, {address.addressLine2 && `${address.addressLine2}, `}
              {address.city}, {address.state} - {address.pincode}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {address.country}
            </p>

            {/* Phone */}
            <p className="mt-2 text-sm font-medium text-gray-800">
              📞 {address.phone}
            </p>
          </div>
        );
      })}
    </div>
  );
}
