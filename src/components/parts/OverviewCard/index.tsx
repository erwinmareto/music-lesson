import { Card } from "@/components/ui/card";
import { OverviewCardProps } from "./types";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OverviewCard = ({ icon, category, total, isUser }: OverviewCardProps) => {
  return (
    <Card
      className={cn(
        isUser
          ? "flex items-end p-2 gap-2 md:gap-4"
          : "grid col-span-12 items-end gap-2 p-4 md:col-span-6 lg:col-span-3 max-sm:flex",
      )}
    >
      <div className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded-lg">
        {icon}
      </div>
      <h2 className="text-4xl font-semibold">{total}</h2>
      <Link href={`/${category}`} className="text-xl capitalize">
        {category}
      </Link>
    </Card>
  );
};

export default OverviewCard;
