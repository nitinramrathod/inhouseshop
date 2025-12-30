import UserList from "@/views/UserList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | In House Shop",
  description: "Manage users",
};

const UsersPage = () => {
  return <UserList/>;
};

export default UsersPage;
