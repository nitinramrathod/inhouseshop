import Dashboard from "@/views/dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | In House Shop",
  description: "Manage Analytics",
};

const DashboardPage = () => {
  return <Dashboard></Dashboard>;
};

export default DashboardPage;
