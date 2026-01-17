import Image from "next/image";
import Link from "next/link";

type BannerProps = {
    title: string
    subtitle: string
    price: number
    discountedPrice: number
    redirectUrl: string
    image: string
}

const HeroRightBanner = ({
    title = "Wireless Headphone",
    subtitle = "This product is very good",
    price = 0,
    discountedPrice = 0,
    redirectUrl = "/products",
    image = "/images/hero/side-hero-2.png"
}: BannerProps) => {
    return (
        <div className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
            <div className="flex items-center gap-14">
                <div>
                    <div className="mb-10">
                        <h2 className="max-w-[153px] font-semibold text-dark text-xl  hover:text-blue">
                            <Link href={redirectUrl}> {title} </Link>
                        </h2>
                        <p className="text-sm text-dark-3">
                            {subtitle}
                        </p>
                    </div>

                    <div>
                        <p className="font-medium text-dark-4 text-xs mb-1.5 uppercase">
                            limited time offer
                        </p>
                        <span className="flex items-center gap-3">
                            <span className="font-bold text-heading-5 text-blue">
                                ₹{discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-2xl font-medium line-through text-dark-4">
                                ₹{price.toLocaleString()}
                            </span>
                        </span>
                    </div>
                </div>

                <div>
                    <Image
                        src={image}
                        alt="mobile image"
                        width={123}
                        height={161}
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroRightBanner;