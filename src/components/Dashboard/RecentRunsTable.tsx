import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Activity {
  id: string;
  name: string;
  distance: number;
  moving_time: number;
  start_date: string;
  type: string;
}

const RecentRunsTable = () => {
  const [runs, setRuns] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchRuns = async () => {
      const res = await fetch("/api/strava/activities");
      const allActivities = await res.json();

      const runsOnly = allActivities
        .filter((act: Activity) => act.type === "Run")
        .sort(
          (a: Activity, b: Activity) =>
            new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        )
        .slice(0, 4);

      setRuns(runsOnly);
    };

    fetchRuns();
  }, []);

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Distance (km)</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Pace (/km)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map((run) => (
            <TableRow key={run.id}>
              <TableCell>{new Date(run.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{run.name}</TableCell>
              <TableCell>{(run.distance / 1000).toFixed(2)}</TableCell>
              <TableCell>{Math.round(run.moving_time / 60)} min</TableCell>
              <TableCell>
                {(
                  (run.moving_time / 60) /
                  (run.distance / 1000)
                ).toFixed(1)}{" "}
                min/km
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentRunsTable;
