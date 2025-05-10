import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
// import { Input } from "@/components/ui/input";

interface Activity {
  id: string;
  name: string;
  distance: number;
  moving_time: number;
  average_speed: number;
  start_date: string;
}

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/strava/activities");
        const data = await res.json();
        setActivities(data);
      } catch (error) {
        console.error("Failed to load activities", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">Activities</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          All your running activities in one place
        </p>

        {loading ? (
          <p className="text-sm text-gray-500">Loading activities...</p>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Distance (km)</TableHead>
                    <TableHead>Moving Time</TableHead>
                    <TableHead>Average Speed (m/s)</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        {new Date(activity.start_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>
                        {(activity.distance / 1000).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {(activity.moving_time / 60).toFixed(0)} min
                      </TableCell>
                      <TableCell>{activity.average_speed.toFixed(2)}</TableCell>
                      <TableCell>
                        <ChevronRight size={18} className="text-gray-400" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Activities;
