"use client";

import { BookAudio, CircleDollarSign, Music2, Package } from "lucide-react";

import OverviewCard from "@/components/parts/OverviewCard";
import RevenueCharts from "@/components/parts/Charts/RevenueChart";
import LessonChart from "@/components/parts/Charts/LessonChart";
import InstrumentChart from "@/components/parts/Charts/InstrumentsChart";
import { useUserCount } from "@/queries/user";
import ReactQuery from "@/components/parts/ReactQuery";
import { useLessonCount } from "@/queries/lessons";
import { useInstrumentCount } from "@/queries/instruments";
import { usePackageCount } from "@/queries/packages";
import { useRevenueSum } from "@/queries/payments";
import { UserCountConstant } from "@/lib/constants/datas";

const HomePage = () => {
  const userCountQuery = useUserCount();
  const lessonCountQuery = useLessonCount();
  const instrumentCountQuery = useInstrumentCount();
  const packageCountQuery = usePackageCount();
  const revenueSumQuery = useRevenueSum();

  return (
    <div className="flex flex-col gap-4 p-4">
      <section className="flex flex-col gap-4">
        <h1 className="font-semibold text-4xl">Overview</h1>

        <div className="flex gap-4 max-sm:justify-between">
          {/* student and teacher count */}
          <ReactQuery
            queryResult={userCountQuery}
            render={(data) => (
              <>
                {UserCountConstant.map((item, index) => (
                  <OverviewCard
                    key={index}
                    icon={item.icon}
                    category={item.category}
                    total={parseInt(
                      data?.[index].count as string
                    ).toLocaleString()}
                    isUser
                  />
                ))}
              </>
            )}
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* total instrument count */}
          <ReactQuery
            queryResult={instrumentCountQuery}
            render={(data) => (
              <OverviewCard
                icon={<Music2 />}
                category="instruments"
                total={parseInt(data as string).toLocaleString()}
              />
            )}
          />

          {/* total lesson count */}
          <ReactQuery
            queryResult={lessonCountQuery}
            render={(data) => (
              <OverviewCard
                icon={<BookAudio />}
                category="lessons"
                total={parseInt(data as string).toLocaleString()}
              />
            )}
          />

          {/* total package count */}
          <ReactQuery
            queryResult={packageCountQuery}
            render={(data) => (
              <OverviewCard
                icon={<Package />}
                category="packages"
                total={parseInt(data as string).toLocaleString()}
              />
            )}
          />

          {/* revenue sum of payment rates */}
          <ReactQuery
            queryResult={revenueSumQuery}
            render={(data) => (
              <OverviewCard
                icon={<CircleDollarSign />}
                category="revenue"
                // @ts-expect-error - there is "rate" data inside of data[0].sum but TS is saying .sum is a string when it is an object
                total={parseFloat(data[0].sum?.rate).toLocaleString()}
              />
            )}
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
