import Layout from "../components/Layout/Layout";
import RecentRunsTable from "../components/Dashboard/RecentRunsTable";
import WeeklyDistanceChart from "../components/Dashboard/WeeklyDistanceChart";
import NextRunCard from "../components/Dashboard/NextRunCard";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your progress and plan your next run</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <WeeklyDistanceChart />
          </div>
          <div>
            <NextRunCard />
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Recent Runs</h2>
          <RecentRunsTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;