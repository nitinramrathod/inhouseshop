import { Product } from "@/types/product";
const shopData: Product[] = [
  {
    title: "Dell 5420 i5 11th Generation",
    reviews: 15,
    price: 27000,
    discountedPrice: 22000,
    id: 1,
    description:'Description of the product',
    inStock: true,
    rating: 4,
    imgs: {
      thumbnails: [
        "/images/products/Dell-5420-I5-11th.jpeg",
        "/images/products/Dell-5420-I5-11th.jpeg",
      ],
      previews: [
        "/images/products/Dell-5420-I5-11th.jpeg",
        "/images/products/Dell-5420-I5-11th.jpeg",
      ],
    },
  },
  {
    title: "Acer i5 6th Generation",
    reviews: 5,
    price: 16000,
    description:'8GB RAM and 256GB SSD with adapter',
    discountedPrice: 12500,
    id: 2,
    imgs: {
      thumbnails: [
        "/images/products/Acer-i5-6th-Generation.jpeg",
        "/images/products/Acer-i5-6th-Generation.jpeg",
      ],
      previews: [
        "/images/products/Acer-i5-6th-Generation.jpeg",
        "/images/products/Acer-i5-6th-Generation.jpeg",
      ],
    },
  },
  {
    title: "Dell 3410 i3 10th Gen",
    reviews: 5,
    price: 20000,
    description:' 8gb ram 256 gb SSD with adapter ',
    discountedPrice: 16000,
    id: 3,
    imgs: {
      thumbnails: [
        "/images/products/Dell-3410-i3-10th-Generation.jpeg",
        "/images/products/Dell-3410-i3-10th-Generation.jpeg",
      ],
      previews: [
        "/images/products/Dell-3410-i3-10th-Generation.jpeg",
        "/images/products/Dell-3410-i3-10th-Generation.jpeg",
      ],
    },
  },
  {
    title: "Dell 5510 i5 9th gen",
    reviews: 6,
    price: 28500,
    description:'8gb ram 256 SSD Adaptor 15.6 screen 2gb grafic card',
    discountedPrice: 23500,
    id: 4,
    imgs: {
      thumbnails: [
        "/images/products/Dell-5510-i5-9th-gen.jpeg",
        "/images/products/Dell-5510-i5-9th-gen.jpeg",
      ],
      previews: [
        "/images/products/Dell-5510-i5-9th-gen.jpeg",
        "/images/products/Dell-5510-i5-9th-gen.jpeg",
      ],
    },
  },
  {
    title: "Dell 5490 i7 8th",
    reviews: 3,
    price: 25000,
    description:'8gb ram 256 SSD Adaptor ',
    discountedPrice: 19000,
    id: 5,
    imgs: {
      thumbnails: [
        "/images/products/Dell-5490-i7-8th-gen.jpeg",
        "/images/products/Dell-5490-i7-8th-gen.jpeg",
      ],
      previews: [
        "/images/products/Dell-5490-i7-8th-gen.jpeg",
        "/images/products/Dell-5490-i7-8th-gen.jpeg",
      ],
    },
  },
  {
    title: "Dell 5400 i7 8th Gen",
    reviews: 15,
    price: 23000,
    description:'8th generation 8gb 256 SSD No adaptor',
    discountedPrice: 18600,
    id: 6,
    imgs: {
      thumbnails: [
        "/images/products/Dell-5400-i7-8th-gen.jpeg",
        "/images/products/Dell-5400-i7-8th-gen.jpeg",
      ],
      previews: [
        "/images/products/Dell-5400-i7-8th-gen.jpeg",
        "/images/products/Dell-5400-i7-8th-gen.jpeg",
      ],
    },
  },
  {
    title: "Hp ProBook 645 G4 1gb Graphics Card",
    reviews: 15,
    price: 25000,
    description:`1.  AMD Ryzen 5 2500u Processor 2.  Ram 8gb DDR4 3.  Storage 256gb SSD 4.  Good Battery Backup
                  5.  Screen Size 14 inch 6.  Good Condition Laptop 7.  With adaptor 65watt 
                  8.  Windows 10 Pro With MS Office 9.  Keyboard Backlight`,
    discountedPrice: 18500,
    id: 7,
    imgs: {
      thumbnails: [
        "/images/products/HP-ProBook-645-G4-1gb.jpeg",
        "/images/products/HP-ProBook-645-G4-1gb.jpeg",
      ],
      previews: [
        "/images/products/HP-ProBook-645-G4-1gb.jpeg",
        "/images/products/HP-ProBook-645-G4-1gb.jpeg",
      ],
    },
  },
  {
    title: "HP 430 g3 i3 6th gen",
    reviews: 15,
    price: 18000,
    description:'8gb 256 SSD',
    discountedPrice: 12500,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/HP-430-g3-i3-6th-gen.jpeg",
        "/images/products/HP-430-g3-i3-6th-gen.jpeg",
      ],
      previews: [
        "/images/products/HP-430-g3-i3-6th-gen.jpeg",
        "/images/products/HP-430-g3-i3-6th-gen.jpeg",
      ],
    },
  },
  {
    title: "HP 820 G4 i5 7th Gen",
    reviews: 15,
    price: 18500,
    description:'8GB RAM, 256GB SSD',
    discountedPrice: 14500,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/HP-820-G4-i5-7th-gen.jpeg",
        "/images/products/HP-820-G4-i5-7th-gen.jpeg",
      ],
      previews: [
        "/images/products/HP-820-G4-i5-7th-gen.jpeg",
        "/images/products/HP-820-G4-i5-7th-gen.jpeg",
      ],
    },
  },
  {
    title: "Dell 3490 i5 7th",
    reviews: 15,
    price: 23000,
    description:'RAM 8GB, 256GB SSD',
    discountedPrice: 17000,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/Dell-3490-i5-7th.jpeg",
        "/images/products/Dell-3490-i5-7th.jpeg",
      ],
      previews: [
        "/images/products/Dell-3490-i5-7th.jpeg",
        "/images/products/Dell-3490-i5-7th.jpeg",
      ],
    },
  },
  {
    title: "Dell 5420 i5 11th Gen",
    reviews: 15,
    price: 32000,
    description:'8GB RAM, 256GB SSD, Adaptor',
    discountedPrice: 26000,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/Dell-5420-i5-11th-Gen.jpeg",
        "/images/products/Dell-5420-i5-11th-Gen.jpeg",
      ],
      previews: [
        "/images/products/Dell-5420-i5-11th-Gen.jpeg",
        "/images/products/Dell-5420-i5-11th-Gen.jpeg",
      ],
    },
  },
  {
    title: "Lenovo L450 i5 5th gen",
    reviews: 15,
    price: 17500,
    description:'8gb ram 256 gb SSD with adapter 14 inch Windows 10 With adapter',
    discountedPrice: 12500,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/Lenovo-L450-i5-5th-gen.jpeg",
        "/images/products/Lenovo-L450-i5-5th-gen.jpeg",
      ],
      previews: [
        "/images/products/Lenovo-L450-i5-5th-gen.jpeg",
        "/images/products/Lenovo-L450-i5-5th-gen.jpeg",
      ],
    },
  },
  {
    title: "HP 430 G3 i5 6th gen",
    reviews: 15,
    price: 18000,
    description:' 8GB RAM, 256GB SSD with adapter',
    discountedPrice: 14000,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
      ],
      previews: [
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
      ],
    },
  },
  {
    title: "Acer i3 6th Gen",
    reviews: 15,
    price: 16500,
    description:' 8gb RAM, 256 gb ssd with adaptor 14 inch',
    discountedPrice: 12000,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/Acer-i3-6th-gen.jpeg",
        "/images/products/Acer-i3-6th-gen.jpeg",
      ],
      previews: [
        "/images/products/Acer-i3-6th-gen.jpeg",
        "/images/products/Acer-i3-6th-gen.jpeg",
      ],
    },
  },
  {
    title: "HP 430 G3 i5 6th gen",
    reviews: 15,
    price: 18000,
    description:' 8GB RAM, 256GB SSD with adapter',
    discountedPrice: 14000,
    id: 8,
    imgs: {
      thumbnails: [
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
      ],
      previews: [
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
        "/images/products/HP-430-G3-i5-6th-gen.jpeg",
      ],
    },
  },
];

export default shopData;
