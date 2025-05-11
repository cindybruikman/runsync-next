"use client";

import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import GeneratePlanModal from "@/components/Plan/GeneratePlanModal";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Workout = {
  title: string;
  description: string;
  duration: string;
  completed: boolean;
};

const Plan = () => {
  const [plan, setPlan] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch("/api/plan");
      const data = await res.json();
      setPlan(data);
    };
    fetchPlan();
  }, []);

  // Dynamische metadata (mock, vervang later met context of echte data)
  const currentGoal = "5K in 22:30";
  const totalWeeks = 8;

  // Huidige weeknummer bepalen vanaf startdatum (bijv. 3 weken geleden)
  const getWeekNumber = (startDate: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.min(Math.floor(diffInDays / 7) + 1, totalWeeks);
  };

  const week = getWeekNumber(new Date("2024-04-15"));
  const percent = Math.round((week / totalWeeks) * 100);

  console.log("PLAN:", plan);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Training Plan</h1>
            <p className="text-gray-600 dark:text-gray-400">
              5K Improvement - Week {week} of {totalWeeks}
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Edit Plan</Button>
            <GeneratePlanModal />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Current Goal: {currentGoal}
          </h2>
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Week {week} of {totalWeeks}
            </span>
            <span>{percent}% Complete</span>
          </div>
          <Progress
            value={percent}
            className="h-2 bg-gray-100 dark:bg-gray-700"
          >
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: `${percent}%` }}
            ></div>
          </Progress>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
          {days.map((day, index) => {
            const workoutIndex = (week - 1) * 7 + index;
            const workout = plan[workoutIndex] ?? {
              title: "Rest",
              description: "No workout scheduled.",
              duration: "",
              completed: false,
            };

            const today = new Date();
            const todayIndex = (today.getDay() + 6) % 7; // maandag = 0
            const isToday = index === todayIndex;

            // const fallbackWorkout = {
            //   title: "Rest",
            //   description: "No workout scheduled.",
            //   duration: "",
            //   completed: false,
            // };

            // const finalWorkout = workout || fallbackWorkout;

            return (
              <div
                key={day}
                className={`rounded-xl p-4 border-2 ${
                  isToday
                    ? "border-accent bg-accent/5"
                    : workout?.completed
                    ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">{day}</span>
                  {workout?.completed && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                      Complete
                    </span>
                  )}
                  {isToday && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                      Today
                    </span>
                  )}
                </div>

                <h3 className="font-semibold mb-2">
                  {workout?.title || "Rest"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {workout?.description || "No scheduled workout."}
                </p>
                <div className="flex justify-between items-center">
                  {workout?.duration && workout.duration !== "0 min" && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {workout.duration}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Volledig trainingsschema</h2>
          <div className="space-y-10">
            {Array.from(
              { length: Math.ceil((plan?.length ?? 0) / 7) },

              (_, weekIndex) => {
                const weekPlan = (plan ?? []).slice(
                  weekIndex * 7,
                  (weekIndex + 1) * 7
                );

                return (
                  <div key={weekIndex}>
                    <h3 className="text-xl font-semibold mb-4">
                      Week {weekIndex + 1}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
                      {weekPlan.map((workout, i) => {
                        const safeWorkout = workout ?? {
                          title: "Rest",
                          description: "No workout scheduled.",
                          duration: "",
                          completed: false,
                        };

                        return (
                          <div
                            key={i}
                            className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                          >
                            <h4 className="font-medium mb-1">{days[i % 7]}</h4>
                            <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold">
                              {safeWorkout.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {safeWorkout.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {safeWorkout.duration}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Plan;
