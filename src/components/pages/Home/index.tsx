import { BookAudio, CircleDollarSign, Music2, Package } from "lucide-react";

import OverviewCard from "@/components/parts/OverviewCard";
const HomePage = () => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h1 className="font-semibold text-4xl">Overview</h1>
      <section className="grid grid-cols-12 gap-4">
        <OverviewCard icon={<Music2 />} category="instruments" total={7} />
        <OverviewCard icon={<BookAudio />} category="lessons" total={24} />
        <OverviewCard icon={<Package />} category="packages" total={6} />
        <OverviewCard
          icon={<CircleDollarSign />}
          category="payments"
          total={15}
        />
      </section>
    </section>
  );
};

export default HomePage;
