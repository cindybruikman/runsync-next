import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import activities from "@/data/activities.json";

const days = ["M", "T", "W", "T", "F", "S", "S"]; // Monday start

const getDayIndex = (dateStr: string): number => {
  const date = new Date(dateStr);
  const jsDay = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  return (jsDay + 6) % 7; // Maandag wordt 0, zondag wordt 6
};


// Init week data met 0 km
const weeklyData = days.map((day) => ({ name: day, distance: 0 }));

// Tel op per dag
activities.forEach((activity) => {
  const idx = getDayIndex(activity.date); // bv. 0–6
  weeklyData[idx].distance += parseFloat(activity.distance);
});

const data = weeklyData;

const WeeklyDistanceChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6">Weekly Distance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e0e0e0"
              vertical={false}
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={5}
              unit=" km"
              width={60}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "0.5rem",
                border: "none",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="distance"
              stroke="#ABD904"
              fill="url(#colorDistance)"
              strokeWidth={2.5}
            />
            <defs>
              <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ABD904" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ABD904" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total Distance
          </p>
          <p className="text-2xl font-bold">28.5 km</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Weekly Goal
          </p>
          <p className="text-2xl font-bold">35 km</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Progress</p>
          <p className="text-2xl font-bold text-accent">81%</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyDistanceChart;
