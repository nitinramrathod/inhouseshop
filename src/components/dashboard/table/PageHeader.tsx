import { Plus } from "lucide-react";
import Link from "next/link";

interface PageHeaderTypes {
    href: string
    title: string
    buttonText: string
}
const PageHeader = ({ href, title, buttonText }: PageHeaderTypes) => {
    return (
        <div className="flex justify-between my-4">
            <h1 className="text-[1.5rem] leading-[2rem]">{title}</h1>
            <Link href={href} className="flex gap-2"><Plus />{buttonText}</Link>
        </div>
    )
}

export default PageHeader;