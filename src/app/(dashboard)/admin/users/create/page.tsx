import CreateUser from "@/views/UserDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | In House Shop",
  description: "Manage users",
};

const UsersDetailPage = () => {
  return <CreateUser/>;
};

export default UsersDetailPage;
