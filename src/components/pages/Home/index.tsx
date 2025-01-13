import { BookAudio, CircleDollarSign, Music2, Package } from "lucide-react";

import OverviewCard from "@/components/parts/OverviewCard";
import RevenueCharts from "@/components/parts/Charts/RevenueChart";
import LessonChart from "@/components/parts/Charts/LessonChart";
import InstrumentChart from "@/components/parts/Charts/InstrumentsChart";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <section className="flex flex-col gap-4">
        <h1 className="font-semibold text-4xl">Overview</h1>
        <div className="grid grid-cols-12 gap-4">
          <OverviewCard icon={<Music2 />} category="instruments" total={7} />
          <OverviewCard icon={<BookAudio />} category="lessons" total={24} />
          <OverviewCard icon={<Package />} category="packages" total={6} />
          <OverviewCard
            icon={<CircleDollarSign />}
            category="payments"
            total={15}
          />
        </div>
      </section>

      <section className="flex flex-col h-auto gap-4">
        <h1 className="font-semibold text-4xl">Analysis</h1>
        <div className="grid grid-cols-3 grid-rows-1 gap-2 max-lg:grid-cols-1">
          <div className="grid col-span-2 row-span-1 items-start">
            <RevenueCharts />
          </div>
          <div className="grid grid-cols-1 col-span-1 grid-rows-1 row-span-1 gap-2 ">
            <div className="grid col-span-1 row-span-1">
              <LessonChart />
            </div>
            <div className="grid col-span-1 row-span-1">
              <InstrumentChart />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
