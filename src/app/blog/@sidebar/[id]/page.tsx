import Sidebar from "@/components/sidebar/Sidebar";
import SidebarItem from "@/components/sidebar/SidebarItem";
import classNames from "classnames";

export const SidebarPanel = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;
  return <Sidebar blogId={id} />;
};

export default SidebarPanel;
