import Layout from "../components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import plan from "@/data/plan.json";
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
// const currentPlan = [
//   {
//     title: "Speed Intervals",
//     description: "8 x 400m intervals with 200m recovery jog between each",
//     duration: "40 min",
//     completed: true
//   },
//   {
//     title: "Rest Day",
//     description: "Active recovery or complete rest",
//     duration: "0 min",
//     completed: true
//   },
//   {
//     title: "Easy Run",
//     description: "Relaxed pace, focus on form and breathing",
//     duration: "30 min",
//     completed: false,
//     current: true
//   },
//   {
//     title: "Tempo Run",
//     description: "15 min easy, 20 min at threshold pace, 10 min easy",
//     duration: "45 min",
//     completed: false
//   },
//   {
//     title: "Rest Day",
//     description: "Focus on stretching and mobility",
//     duration: "0 min",
//     completed: false
//   },
//   {
//     title: "Long Run",
//     description: "Steady conversational pace throughout",
//     duration: "70 min",
//     completed: false
//   },
//   {
//     title: "Recovery Run",
//     description: "Very easy effort to promote recovery",
//     duration: "25 min",
//     completed: false
//   }
// ];

const Plan = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Training Plan</h1>
            <p className="text-gray-600 dark:text-gray-400">
              5K Improvement - Week 3 of 8
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Edit Plan</Button>
            <GeneratePlanModal />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Current Goal: 5K in 22:30
          </h2>
          <div className="mb-2 flex justify-between text-sm">
            <span>Week 3 of 8</span>
            <span>38% Complete</span>
          </div>
          <Progress value={38} className="h-2 bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full bg-accent rounded-full"
              style={{ width: "38%" }}
            ></div>
          </Progress>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
          {days.map((day, index) => {
            const workout = plan[index];

            return (
              <div
                key={day}
                className={`rounded-xl p-4 border-2 ${
                  workout.current
                    ? "border-accent bg-accent/5"
                    : workout.completed
                    ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">{day}</span>
                  {workout.completed && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                      Complete
                    </span>
                  )}
                  {workout.current && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                      Today
                    </span>
                  )}
                </div>

                <h3 className="font-semibold mb-2">{workout.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {workout.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {workout.duration}
                  </span>
                  {!workout.completed && workout.duration !== "0 min" && (
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      Log Run
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Plan;
