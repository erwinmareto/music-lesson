'use client';

import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useLessonByStatusCount } from '@/queries/lessons';

const LessonChart = () => {
  const { data: lessonByStatus } = useLessonByStatusCount();

  const realData = lessonByStatus?.map((item) => ({
    status: item.status,
    total: parseInt(item.count as string),
    fill: item.status === 'attended' ? 'var(--color-success)' : 'var(--color-danger)'
  }));

  const chartConfig = {
    success: {
      label: 'Attended',
      color: 'hsl(var(--chart-2))'
    },
    danger: {
      label: 'Absent',
      color: 'hsl(var(--chart-1))'
    }
  } satisfies ChartConfig;

  const totalLessons = realData?.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Lesson Attendance</CardTitle>
        <CardDescription>Attendance percentage of all lessons</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={realData} dataKey="total" nameKey="status" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalLessons?.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Lessons
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LessonChart;
