import Layout from "../components/Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import activities from "@/data/activities.json";

const Activities = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Activities</h1>
          <p className="text-gray-600 dark:text-gray-400">
            All your running activities in one place
          </p>
        </div>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input placeholder="Search activities..." className="pl-10" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Distance (km)</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Pace (/km)</TableHead>
                  {/* <TableHead>Effort</TableHead> */}
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow
                    key={activity.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  >
                    <TableCell>{activity.date}</TableCell>
                    <TableCell className="font-medium">
                      {activity.title}
                    </TableCell>
                    <TableCell>{activity.distance}</TableCell>
                    <TableCell>{activity.duration}</TableCell>
                    <TableCell>{activity.pace}</TableCell>
                    {/* <TableCell>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          activity.effort === "Easy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : activity.effort === "Moderate"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {activity.effort}
                      </span>
                    </TableCell> */}
                    <TableCell>
                      <ChevronRight size={18} className="text-gray-400" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Showing 8 of 54 activities
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
