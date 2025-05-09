"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const GeneratePlanModal = () => {
  const [distance, setDistance] = useState("5K");
  const [weeks, setWeeks] = useState(6);
  const [level, setLevel] = useState("Beginner");
  const [daysPerWeek, setDaysPerWeek] = useState(3);
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleDay = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      distance,
      weeks,
      level,
      daysPerWeek,
      preferredDays,
    };

    console.log("Sending to GPT:", payload);

    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch generated plan.");
      }

      const generatedPlan = await res.json();
      console.log("Generated plan:", generatedPlan);

      // ⬇️ Plan opslaan in de database
      const save = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generatedPlan),
      });

      if (!save.ok) {
        throw new Error("Failed to save plan.");
      }

      console.log("Plan saved successfully.");
    } catch (error) {
      console.error("Error generating or saving plan:", error);
    }

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Generate New Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate a Custom Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">Target Distance</label>
            <input
              type="text"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Number of Weeks</label>
            <input
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(parseInt(e.target.value))}
              min={1}
              max={16}
              className="w-full px-3 py-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Experience Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Days Per Week</label>
            <input
              type="number"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
              min={1}
              max={7}
              className="w-full px-3 py-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Preferred Days</label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <label key={day} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={preferredDays.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="accent-blue-500"
                  />
                  {day}
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate New Plan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratePlanModal;
