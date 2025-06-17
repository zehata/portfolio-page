"use client";
import Sidebar from "@/components/sidebar/sidebar";
import getAllArticles from "@/lib/getAllArticles";
import { ArticleType } from "@/lib/types";
import { usePathname } from "next/navigation";
import React from "react";
import isDatabaseActive from "@/lib/isDatabaseActive";
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
    isDatabaseActive().then((databaseActive) =>
      setServerStarting(!databaseActive),
    );
    getAllArticles(ArticleType.Project).then(setProjectItems);
  }, []);

  const [serverStarting, setServerStarting] = React.useState<boolean>(false);

  return (
    <>
      <DynamicBackground name="projects" />
      <div className="absolute top-50 w-full h-[calc(100vh-12.5rem)] z-1 flex flex-row">
        <Sidebar
          articleType={ArticleType.Project}
          items={projectItems}
          id={projectId}
          serverStarting={serverStarting && !projectItems}
        />
        {children}
      </div>
    </>
  );
};

export default ProjectsLayout;
