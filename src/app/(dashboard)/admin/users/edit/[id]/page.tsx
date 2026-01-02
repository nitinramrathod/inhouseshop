import { serverFetch } from "@/utils/helper/serverFetch";
import UserForm from "@/views/UserDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | In House Shop",
  description: "Manage users",
};

interface PageProps {
  params: {
    id: string;
  };
}

const UsersDetailPage = async ({ params }: PageProps) => {

  const { id } = await params;

  const user = await serverFetch(`/api/v1/users/${id}`);

  return <UserForm data={user}/>;
};

export default UsersDetailPage;
