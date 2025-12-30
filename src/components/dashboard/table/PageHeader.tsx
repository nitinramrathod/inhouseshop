import { MoveLeft, Plus } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  href: string;
  title: string;
  backTo?: string;
  buttonText: string;
}

const PageHeader = ({ href, title, buttonText, backTo }: PageHeaderProps) => {
  const TitleContent = (
    <div className="flex items-center gap-3">
      {backTo && <MoveLeft className="h-5 w-5" />}
      <span>{title}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-between my-4">
      <h1 className="text-[1.5rem] leading-[2rem]">
        {backTo ? (
          <Link href={backTo} className="hover:opacity-80">
            {TitleContent}
          </Link>
        ) : (
          TitleContent
        )}
      </h1>

      <Link
        href={href}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue text-white hover:bg-slate-800 transition"
      >
        <Plus className="h-4 w-4" />
        {buttonText}
      </Link>
    </div>
  );
};

export default PageHeader;
