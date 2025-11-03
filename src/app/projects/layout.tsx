"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import getAllArticles from "@/lib/getAllArticles";
import { ArticleType } from "@/lib/types";
import { usePathname } from "next/navigation";
import React from "react";
import DynamicBackground from "@/components/backgrounds/DynamicBackground";

const ProjectsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const projectId = React.useMemo(() => pathname.split("/")[2], [pathname]);
  const [projectItems, setProjectItems] = React.useState<
    | {
        id: string;
        title: string;
      }[]
    | null
  >(null);

  React.useEffect(() => {
    setProjectItems(null);
    getAllArticles(ArticleType.Project).then(setProjectItems);
  }, []);

  return (
    <div className="bg-black">
      <DynamicBackground name="projects" />
      <div className="absolute top-30 w-full h-[calc(100vh-7.5rem)] z-1 flex flex-row">
        <Sidebar
          articleType={ArticleType.Project}
          items={projectItems}
          id={projectId}
        />
        {children}
      </div>
    </div>
  );
};

export default ProjectsLayout;
