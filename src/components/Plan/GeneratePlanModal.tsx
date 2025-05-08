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

const GeneratePlanModal = () => {
  const [distance, setDistance] = useState("5K");
  const [weeks, setWeeks] = useState(6);
  const [level, setLevel] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { distance, weeks, level };
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

      // TODO: update plan state or pass to parent component
    } catch (error) {
      console.error("Error generating plan:", error);
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate New Plan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GeneratePlanModal;
