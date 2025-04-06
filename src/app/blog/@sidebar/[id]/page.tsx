import Sidebar from "@/components/sidebar/Sidebar";

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
