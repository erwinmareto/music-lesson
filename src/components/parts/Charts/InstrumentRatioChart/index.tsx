'use client';

import { useSearchParams } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Filters } from '@/lib/filter';
import { useInstruments } from '@/queries/instruments';

const InstrumentRatioChart = () => {
  const searchParams = useSearchParams();

  const instrumentsFilters: Filters[] = [
    {
      field: 'name',
      query: searchParams.get('instrumentName'),
      dataType: 'search'
    }
  ];
  const instrumentsQuery = useInstruments(1, instrumentsFilters);

  const chartConfig = {
    students_count: {
      label: 'Students',
      color: 'hsl(var(--chart-1))'
    },
    teachers_count: {
      label: 'Teachers',
      color: 'hsl(var(--chart-2))'
    }
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher-to-Student Ratios</CardTitle>
        <CardDescription>Show teacher-to-student ratios per instrument.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={instrumentsQuery?.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="teachers_count" fill="var(--color-teachers_count)" radius={4} />
            <Bar dataKey="students_count" fill="var(--color-students_count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InstrumentRatioChart;
