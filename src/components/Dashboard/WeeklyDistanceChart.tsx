"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

interface Activity {
  id: string;
  start_date: string;
  distance: number;
  type: string;
}

const days = ["M", "T", "W", "T", "F", "S", "S"]; // Monday to Sunday

const getDayIndex = (dateStr: string): number => {
  const date = new Date(dateStr);
  const jsDay = date.getDay(); // 0 = Sun, 1 = Mon, ...
  return (jsDay + 6) % 7; // Ma = 0, Zo = 6
};

const WeeklyDistanceChart = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/strava/activities");
        const data = await res.json();
        const runs = data.filter((a: Activity) => a.type === "Run");
        setActivities(runs);
      } catch (error) {
        console.error("Fout bij ophalen activiteiten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const data = useMemo(() => {
    const weeklyData = days.map((day) => ({ name: day, distance: 0 }));

    activities.forEach((activity) => {
      const activityDate = new Date(activity.start_date);
      const today = new Date();
      const thisMonday = new Date(today);
      thisMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      thisMonday.setHours(0, 0, 0, 0);

      if (activityDate >= thisMonday) {
        const idx = getDayIndex(activity.start_date);
        weeklyData[idx].distance += activity.distance / 1000; // m → km
      }
    });

    return weeklyData;
  }, [activities]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md w-full">
      <h3 className="text-xl font-semibold mb-6">Weekly Distance</h3>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
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
      )}
    </div>
  );
};

export default WeeklyDistanceChart;
