import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import activities from "@/data/activities.json";

const sortedRuns = [...activities].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

const recentRuns = sortedRuns.slice(0, 4);

const RecentRunsTable = () => {
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
            {/* <TableHead>Effort</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentRuns.map((run) => (
            <TableRow
              key={run.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            >
              <TableCell>{run.date}</TableCell>
              <TableCell>{run.title}</TableCell>
              <TableCell>{run.distance}</TableCell>
              <TableCell>{run.duration}</TableCell>
              <TableCell>{run.pace}</TableCell>
              {/* <TableCell>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  run.effort === 'Easy' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : run.effort === 'Moderate'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {run.effort}
                </span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentRunsTable;
