'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from '@/components/ui/chart';

const dummyData = [
  { name: 'Mon', distance: 5 },
  { name: 'Tue', distance: 10 },
  { name: 'Wed', distance: 7 },
  { name: 'Thu', distance: 12 },
  { name: 'Fri', distance: 3 },
  { name: 'Sat', distance: 9 },
  { name: 'Sun', distance: 6 },
];

export default function TestChart() {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Test Chart
      </h2>

      <ChartContainer
        className="h-64 w-full"
        config={{
          distance: {
            label: 'Distance (km)',
            color: '#6EDC5F',
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dummyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis unit=" km" />
            <Tooltip content={<ChartTooltipContent />} />
            <ChartLegendContent />
            <Area
              type="monotone"
              dataKey="distance"
              stroke="var(--color-distance)"
              fill="var(--color-distance)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
