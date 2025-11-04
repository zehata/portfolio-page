"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { getAllArticles } from "@/lib/getAllArticles";
import { ArticleType } from "@/lib/types";
import { usePathname } from "next/navigation";
import React from "react";
import DynamicBackground from "@/components/backgrounds/DynamicBackground";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const blogId = React.useMemo(() => pathname.split("/")[2], [pathname]);
  const [blogItems, setBlogItems] = React.useState<
    | readonly {
        id: string;
        title: string;
      }[]
    | null
  >(null);

  React.useEffect(() => {
    setBlogItems(null);
    getAllArticles(ArticleType.Blog).then(setBlogItems);
  }, []);

  return (
    <div className="bg-black">
      <DynamicBackground name="blogs" />
      <div className="absolute top-30 w-full h-[calc(100vh-7.5rem)] z-1 flex flex-row">
        <Sidebar articleType={ArticleType.Blog} items={blogItems} id={blogId} />
        {children}
      </div>
    </div>
  );
};

export default BlogLayout;
