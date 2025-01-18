'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { INSTRUMENTS } from '@/lib/constants/datas';
import { useTopInstruments } from '@/queries/packages';

const InstrumentChart = () => {
  const { data: topInstrumentsData } = useTopInstruments();

  // change the instrument ID to the instrument name and sort by count
  const processedTopInstrumentData = (
    topInstrumentsData?.map((instrument) => ({
      ...instrument,
      instrument: INSTRUMENTS[instrument.instrument - 1] || instrument.instrument,
      fill: `var(--color-${INSTRUMENTS[instrument.instrument - 1]})`
    })) || []
  ).sort((a, b) => Number(b.count ?? 0) - Number(a.count ?? 0));

  const chartConfig = {
    Piano: {
      label: 'Piano',
      color: 'hsl(0, 70%, 40%)' // Red
    },
    Violin: {
      label: 'Violin',
      color: 'hsl(60, 70%, 40%)' // Yellow
    },
    Cello: {
      label: 'Cello',
      color: 'hsl(210, 70%, 40%)' // Sky Blue
    },
    Guitar: {
      label: 'Guitar',
      color: 'hsl(120, 70%, 40%)' // Green
    },
    Percussion: {
      label: 'Percussion',
      color: 'hsl(240, 70%, 40%)' // Blue
    },
    Viola: {
      label: 'Viola',
      color: 'hsl(300, 70%, 40%)' // Purple
    },
    Clarinet: {
      label: 'Clarinet',
      color: 'hsl(90, 70%, 40%)' // Lime
    },
    Harp: {
      label: 'Harp',
      color: 'hsl(270, 70%, 40%)' // Violet
    },
    Trumpet: {
      label: 'Trumpet',
      color: 'hsl(30, 70%, 40%)' // Orange
    },
    Drums: {
      label: 'Drums',
      color: 'hsl(180, 70%, 40%)' // Cyan
    }
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
            data={processedTopInstrumentData}
            layout="vertical"
            margin={{
              right: 16
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis dataKey="instrument" type="category" tickLine={false} tickMargin={10} axisLine={false} hide />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Bar dataKey="count" layout="vertical" fill="var(--color-desktop)" radius={4}>
              <LabelList dataKey="instrument" position="insideLeft" offset={8} className="fill-white" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default InstrumentChart;
