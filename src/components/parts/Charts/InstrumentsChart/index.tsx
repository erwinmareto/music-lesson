"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const InstrumentChart = () => {
  const InstrumentData = [
    { instrument: "Guitar", lessons: 20, fill: "var(--color-success)" },
    { instrument: "Piano", lessons: 37, fill: "var(--color-danger)" },
    { instrument: "Violin", lessons: 15, fill: "var(--color-warning)" },
    { instrument: "Drums", lessons: 12, fill: "var(--color-info)" },
    { instrument: "Saxophone", lessons: 10, fill: "var(--color-primary)" },
    { instrument: "Flute", lessons: 8, fill: "var(--color-secondary)" },
    { instrument: "Trumpet", lessons: 5, fill: "var(--color-tertiary)" },
  ];

  const chartConfig = {
    success: {
      label: "Guitar",
      color: "hsl(120, 100%, 30%)", // Darker Green
    },
    danger: {
      label: "Piano",
      color: "hsl(0, 100%, 30%)", // Darker Red
    },
    warning: {
      label: "Violin",
      color: "hsl(60, 100%, 30%)", // Darker Yellow
    },
    info: {
      label: "Drums",
      color: "hsl(240, 100%, 30%)", // Darker Blue
    },
    primary: {
      label: "Saxophone",
      color: "hsl(300, 100%, 30%)", // Darker Purple
    },
    secondary: {
      label: "Flute",
      color: "hsl(180, 100%, 30%)", // Darker Cyan
    },
    tertiary: {
      label: "Trumpet",
      color: "hsl(30, 100%, 30%)", // Darker Orange
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Instruments</CardTitle>
        <CardDescription>Instruments with the most lessons</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={InstrumentData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="instrument"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="lessons" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="lessons"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
              <LabelList
                dataKey="instrument"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InstrumentChart;
