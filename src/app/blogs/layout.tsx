"use client";
import Sidebar from "@/components/sidebar/sidebar";
import getAllArticles from "@/lib/getAllArticles";
import { ArticleType } from "@/lib/types";
import { usePathname } from "next/navigation";
import React from "react";
import isDatabaseActive from "@/lib/isDatabaseActive";
import DynamicBackground from "@/components/backgrounds/DynamicBackground";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const blogId = React.useMemo(() => pathname.split("/")[2], [pathname]);
  const [blogItems, setBlogItems] = React.useState<
    | {
        id: string;
        title: string;
      }[]
    | null
  >(null);

  React.useEffect(() => {
    setBlogItems(null);
    isDatabaseActive().then((databaseActive) =>
      setServerStarting(!databaseActive),
    );
    getAllArticles(ArticleType.Blog).then(setBlogItems);
  }, []);

  const [serverStarting, setServerStarting] = React.useState<boolean>(false);

  return (
    <>
      <DynamicBackground name="blogs" />
      <div className="absolute top-30 w-full h-[calc(100vh-7.5rem)] z-1 flex flex-row">
        <Sidebar
          articleType={ArticleType.Blog}
          items={blogItems}
          id={blogId}
          serverStarting={serverStarting && !blogItems}
        />
        {children}
      </div>
    </>
  );
};

export default BlogLayout;
