import { Card } from "@/components/ui/card";
import { OverviewCardProps } from "./types";
import Link from "next/link";

const OverviewCard = ({ icon, category, total }: OverviewCardProps) => {
  return (
    <Card className="grid col-span-12 items-end gap-2 p-4 md:col-span-6 lg:col-span-3 max-sm:flex">
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
