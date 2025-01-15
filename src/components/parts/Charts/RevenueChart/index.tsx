"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRevenueByMonth } from "@/queries/payments";
import { MONTHS } from "@/lib/constants/datas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const RevenueCharts = () => {
  const { data: revenueByMonthData } = useRevenueByMonth();
  const [selectedYear, setSelectedYear] = useState(2024); // Default to 2024 (supposed to be the current year but there are no datas for 2025)

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const availableYears = Array.from(
    new Set(revenueByMonthData?.map((item) => item.payment_date_year)),
  );

  const processedData = revenueByMonthData
    ?.filter((item) => item.payment_date_year == selectedYear)
    .map((item) => ({
      month: MONTHS[item.payment_date_month - 1],
      revenue: item.sum.rate,
    }));

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="space-y-1.5">
            <CardTitle>Revenue Chart</CardTitle>
            <CardDescription className="text-xs">
              Tracks the financial performance of the platform, highlighting
              revenue growth or dips.
            </CardDescription>
          </div>
          {processedData && (
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-start">
                <p>Year: </p>
                <Select onValueChange={handleYearChange} value={selectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedYear} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <p className="max-sm:text-sm">Highest Revenue: </p>
                  <p className="font-semibold text-2xl">
                    {/* get the highest revenue */}
                    {Math.max(
                      ...processedData.map((item) =>
                        parseInt(item.revenue as string),
                      ),
                    )}
                  </p>
                </div>
                <div>
                  <p className="max-sm:text-sm">Lowest Revenue: </p>
                  <p className="font-semibold text-2xl">
                    {/* get the lowest revenue */}
                    {Math.min(
                      ...processedData.map((item) =>
                        parseInt(item.revenue as string),
                      ),
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              strokeWidth={4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueCharts;
